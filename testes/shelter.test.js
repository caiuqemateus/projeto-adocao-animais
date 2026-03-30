import request from 'supertest';
import app from '../src/api.js';

describe('Testes do Modelo Shelter', () => {

  let shelterId;

  it('CT-SHELTER-01 - Criar shelter com sucesso', async () => {
    const res = await request(app)
      .post('/shelters')
      .send({
        nome: "Abrigo Esperança",
        telefone: "11999999999",
        cnpj: "123456745",
        endereco: "Rua A",
        responsavel: "Maria"
      });

    expect([200, 201]).toContain(res.statusCode);
    shelterId = res.body.id; 
  });


  it('CT-SHELTER-02 - Listar shelters', async () => {
    const res = await request(app).get('/shelters');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });


  it('CT-SHELTER-03 - Buscar shelter existente', async () => {
    const res = await request(app).get(`/shelters/${shelterId}`);

    expect([200]).toContain(res.statusCode);
  });


  it('CT-SHELTER-04 - Buscar shelter inexistente', async () => {
    const res = await request(app).get('/shelters/999999');

    expect([404, 400]).toContain(res.statusCode);
  });


  it('CT-SHELTER-05 - Atualizar shelter', async () => {
    const res = await request(app)
      .put(`/shelters/${shelterId}`)
      .send({ nome: "Abrigo Atualizado" });

    expect([200, 401, 403]).toContain(res.statusCode);
  });


  it('CT-SHELTER-06 - Deletar shelter', async () => {
    const res = await request(app).delete(`/shelters/${shelterId}`);

    expect([200, 204]).toContain(res.statusCode);
  });

});