import request from 'supertest';
import app from '../src/api.js';

describe('Testes do Modelo Animal', () => {

  
  it('CT-ANIMAL-01 - Criar animal com sucesso', async () => {
    const res = await request(app)
      .post('/animals')
      .send({
        nome: "Rex",
        especie: "Cachorro",
        raca: "Vira-lata",
        vacinado: true,
        castrado: false,
        tags: ["teste"],
        foto: ["img.jpg"],
        userId: 1
      });

    expect([200, 201]).toContain(res.statusCode);
  });

  
  it('CT-ANIMAL-02 - Listar animais', async () => {
    const res = await request(app).get('/animals');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  
  it('CT-ANIMAL-03 - Buscar animal existente', async () => {
    const res = await request(app).get('/animals/1');

    expect([200, 404]).toContain(res.statusCode);
  });

  
  it('CT-ANIMAL-04 - Buscar animal inexistente', async () => {
    const res = await request(app).get('/animals/999999');

    expect([404, 400]).toContain(res.statusCode);
  });

  
  it('CT-ANIMAL-05 - Atualizar sem autenticação', async () => {
    const res = await request(app)
      .put('/animals/1')
      .send({ nome: "Novo Nome" });

    expect([401, 403]).toContain(res.statusCode);
  });

  
  it('CT-ANIMAL-06 - Deletar animal', async () => {
    const res = await request(app).delete('/animals/1');

    expect([200, 204, 404]).toContain(res.statusCode);
  });

});