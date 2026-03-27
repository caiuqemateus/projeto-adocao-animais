import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../src/api.js';
import prisma from '../src/prisma.js';

// Gera um token JWT válido para os testes
function gerarToken(userId = 1, email = 'teste@teste.com', name = 'Teste') {
  return jwt.sign(
    { sub: userId, email, name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

let token;
let usuarioCriado;
let animalCriado1;
let animalCriado2;
let adocaoCriada;

beforeAll(async () => {
  // Cria um usuário de teste
  usuarioCriado = await prisma.user.create({
    data: {
      email: `adoption_test_${Date.now()}@teste.com`,
      pass: 'senha123',
      name: 'Usuário Teste Adoption',
    },
  });

  // Gera token com o ID do usuário criado
  token = gerarToken(usuarioCriado.id, usuarioCriado.email, usuarioCriado.name);

  // Cria dois animais de teste
  animalCriado1 = await prisma.animal.create({
    data: {
      nome: 'Animal Teste Adoption 1',
      especie: 'Cachorro',
      raca: 'Vira-lata',
      vacinado: true,
      castrado: true,
      userId: usuarioCriado.id,
    },
  });

  animalCriado2 = await prisma.animal.create({
    data: {
      nome: 'Animal Teste Adoption 2',
      especie: 'Gato',
      raca: 'Siamês',
      vacinado: true,
      castrado: false,
      userId: usuarioCriado.id,
    },
  });
});

afterAll(async () => {
  // Limpa os dados de teste na ordem correta (respeita FK)
  await prisma.adoption.deleteMany({
    where: {
      OR: [
        { animalId: animalCriado1.id },
        { animalId: animalCriado2.id },
      ],
    },
  });
  await prisma.animal.deleteMany({
    where: {
      id: { in: [animalCriado1.id, animalCriado2.id] },
    },
  });
  await prisma.user.delete({ where: { id: usuarioCriado.id } });
  await prisma.$disconnect();
});

// =========================================================================
// CT-01: Criar adoção com dados válidos
// =========================================================================
describe('POST /adoptions', () => {
  test('CT-01: Deve criar uma adoção com dados válidos e retornar status 201', async () => {
    const res = await request(app)
      .post('/adoptions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        adotanteId: usuarioCriado.id,
        animalId: animalCriado1.id,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.adotanteId).toBe(usuarioCriado.id);
    expect(res.body.animalId).toBe(animalCriado1.id);
    expect(res.body).toHaveProperty('dataAdocao');

    // Guarda para usar nos próximos testes
    adocaoCriada = res.body;
  });

  // =========================================================================
  // CT-02: Criar adoção sem token de autenticação
  // =========================================================================
  test('CT-02: Deve retornar 401 ao criar adoção sem token', async () => {
    const res = await request(app)
      .post('/adoptions')
      .send({
        adotanteId: usuarioCriado.id,
        animalId: animalCriado2.id,
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Token não enviado');
  });

  // =========================================================================
  // CT-09: Criar adoção com animalId já adotado (duplicado)
  // =========================================================================
  test('CT-09: Deve retornar 409 ao tentar adotar animal já adotado', async () => {
    const res = await request(app)
      .post('/adoptions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        adotanteId: usuarioCriado.id,
        animalId: animalCriado1.id, // já foi adotado no CT-01
      });

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Registro duplicado (unique)');
  });
});

// =========================================================================
// CT-03: Listar todas as adoções
// =========================================================================
describe('GET /adoptions', () => {
  test('CT-03: Deve listar todas as adoções e retornar status 200', async () => {
    const res = await request(app)
      .get('/adoptions')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    // Verifica que inclui dados expandidos
    expect(res.body[0]).toHaveProperty('adotante');
    expect(res.body[0]).toHaveProperty('animal');
  });

  // =========================================================================
  // CT-10: Listar adoções com filtro por adotanteId
  // =========================================================================
  test('CT-10: Deve filtrar adoções pelo adotanteId', async () => {
    const res = await request(app)
      .get(`/adoptions?adotanteId=${usuarioCriado.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Todas as adoções retornadas devem pertencer ao adotante filtrado
    res.body.forEach((adocao) => {
      expect(adocao.adotanteId).toBe(usuarioCriado.id);
    });
  });
});

// =========================================================================
// CT-04 e CT-05: Buscar adoção por ID
// =========================================================================
describe('GET /adoptions/:id', () => {
  test('CT-04: Deve retornar adoção existente com status 200', async () => {
    const res = await request(app)
      .get(`/adoptions/${adocaoCriada.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(adocaoCriada.id);
    expect(res.body).toHaveProperty('adotante');
    expect(res.body).toHaveProperty('animal');
    expect(res.body.adotante).toHaveProperty('id');
    expect(res.body.animal).toHaveProperty('id');
  });

  test('CT-05: Deve retornar 404 ao buscar adoção com ID inexistente', async () => {
    const res = await request(app)
      .get('/adoptions/99999')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Não encontrado');
  });
});

// =========================================================================
// CT-06 e CT-07: Atualizar adoção
// =========================================================================
describe('PUT /adoptions/:id', () => {
  test('CT-06: Deve atualizar a data de adoção e retornar status 200', async () => {
    const novaData = '2026-06-15T10:00:00.000Z';

    const res = await request(app)
      .put(`/adoptions/${adocaoCriada.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ dataAdocao: novaData });

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(adocaoCriada.id);
    expect(new Date(res.body.dataAdocao).toISOString()).toBe(novaData);
  });

  test('CT-07: Deve retornar 404 ao atualizar adoção com ID inexistente', async () => {
    const res = await request(app)
      .put('/adoptions/99999')
      .set('Authorization', `Bearer ${token}`)
      .send({ dataAdocao: '2026-06-15T10:00:00.000Z' });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Não encontrado');
  });
});

// =========================================================================
// CT-08: Deletar adoção
// =========================================================================
describe('DELETE /adoptions/:id', () => {
  test('CT-08: Deve deletar adoção existente e retornar status 200', async () => {
    const res = await request(app)
      .delete(`/adoptions/${adocaoCriada.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(adocaoCriada.id);

    // Confirma que foi realmente deletada
    const verificacao = await request(app)
      .get(`/adoptions/${adocaoCriada.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(verificacao.status).toBe(404);
  });
});
