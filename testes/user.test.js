import request from 'supertest';
import app from '../src/api.js';

describe("Testes do Modelo User", () => {

  it("CT-USER-01 - Criar usuário com sucesso ou duplicado", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: `teste${Date.now()}@pet.com`, // evita duplicado
        senha: "123@456",
        nome: "Teste"
      });

    expect([200, 201]).toContain(res.statusCode);
  });

  it("CT-USER-02 - Criar usuário com senha inválida", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: `teste2${Date.now()}@pet.com`,
        senha: "123",
        nome: "Teste"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("CT-USER-03 - Criar usuário com CPF inválido", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: `teste3${Date.now()}@pet.com`,
        senha: "123@456",
        nome: "Teste",
        cpf: "12345678900"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("CPF inválido");
  });

  it("CT-USER-04 - Listar usuários", async () => {
    const res = await request(app).get("/users");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("CT-USER-05 - Buscar usuário", async () => {
    const res = await request(app).get("/users/1");

    expect([200, 404]).toContain(res.statusCode);
  });

  it("CT-USER-06 - /me sem token", async () => {
    const res = await request(app).get("/users/me");

    expect(res.statusCode).toBe(401);
  });

  it("CT-USER-07 - Login inválido", async () => {
    const res = await request(app)
      .post("/users/login")
      .send({
        email: "naoexiste@pet.com",
        senha: "123@456"
      });

    expect(res.statusCode).toBe(404);
  });

});