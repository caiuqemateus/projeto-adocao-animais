# 🐾 Novo Amigo
 
Equipe
- Giovanna Alves  
- João Pedro  
- Luiz Reinã  
- Rafaela Saraiva
 
## Visão Geral
Nosso sistema de adoção de pets foi desenvolvido com o objetivo de tornar o processo de adoção mais simples, seguro e eficiente. A plataforma conecta pessoas interessadas em adotar com ONGs e abrigos parceiros, permitindo que encontrem facilmente animais disponíveis, conheçam suas histórias e deem a eles uma nova chance de ter um lar. Além de facilitar a busca, o sistema contribui para a adoção responsável, promovendo transparência, credibilidade e bem-estar animal.
 
## Tecnologias utilizadas
- Linguagem: JavaScript / TypeScript  
- Framework: Node.js  
- Banco de dados: PostgreSQL (ex.: em produção) / SQLite (ex.: para testes) — Prisma ORM  
- Autenticação: JWT  
- Bibliotecas auxiliares citadas: bcrypt, express-session, nodemailer, uuid, jsonwebtoken
 
## Instalação e execução (backend)
1. Clone o repositório do backend:
```bash
git clone https://github.com/caiuqemateus/projeto-adocao-animais.git
cd projeto-adocao-animais
```
 
2. Instale as dependências:
```bash
npm install
```
 
3. Configure as variáveis de ambiente (.env). Exemplo mínimo:
```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/novo_amigo
PORT=3000
JWT_SECRET=sua_chave_secreta
```
Observação: o schema do Prisma abaixo está com datasource `sqlite` como exemplo; troque a DATABASE_URL para PostgreSQL conforme sua necessidade.
 
4. Prisma — gerar client, aplicar migrações e abrir studio:
```bash
npx prisma generate                    # Gera o Prisma Client
npx prisma migrate dev --name init     # Cria e aplica migração (modo dev)
# ou, se preferir forçar o schema (apaga dados):
npx prisma db push --force-reset
npx prisma studio                      # Abre painel visual para ver e editar dados
```
 
5. Inicie o servidor em modo desenvolvimento:
```bash
npm run dev
```
 
6. Bibliotecas úteis (caso precise instalar manualmente):
```bash
npm install bcrypt express-session nodemailer uuid
npm install jsonwebtoken
```
 
> Dica: use `npx prisma migrate dev --name 'descrição_da_migração'` para criar migrações com nome personalizado.
 
---
 
## Modelagem de dados (exemplo Prisma Schema)
Observação: ajuste datasource (DATABASE_URL) para seu banco (Postgres/SQLite). Exemplo de generator/datasource:
 
```prisma
generator client {
  provider = "prisma-client-js"
}
 
datasource db {
  provider = "sqlite" // ou "postgresql" em produção
  url      = env("DATABASE_URL")
}
```
 
Modelos principais:
 
```prisma
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  pass      String
  name      String
  cpf       String    @unique
  phone     String
  endereco  String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
 
  animais   Animal[]
  adocoes   Adoption[]
  group     GroupUser[]
 
  @@map("users")
}
 
model Animal {
  id        Int       @id @default(autoincrement())
  nome      String
  especie   String
  raca      String?
  idade     Int?
  sexo      String?
  descricao String?
  status    String    @default("disponivel")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
 
  userId    Int
  shelterId Int?
 
  user      User     @relation(fields: [userId], references: [id])
  shelter   Shelter? @relation(fields: [shelterId], references: [id])
  adocao    Adoption?
 
  @@map("animals")
}
 
model Shelter {
  id          Int       @id @default(autoincrement())
  nome        String
  cnpj        String?   @unique
  endereco    String?
  telefone    String?
  responsavel String?
  urlImage    String?
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
 
  animals Animal[]
 
  @@map("shelters")
}
 
model Adoption {
  id         Int       @id @default(autoincrement())
  dataAdocao DateTime  @default(now())
 
  adotanteId Int
  animalId   Int       @unique
 
  adotante   User   @relation(fields: [adotanteId], references: [id])
  animal     Animal @relation(fields: [animalId], references: [id])
 
  @@map("adoptions")
}
 
model Role {
  id         Int          @id @default(autoincrement())
  nome       String       @unique
  descricao  String
  groups     RoleGroups[]
}
 
model Group {
  id         Int           @id  @default(autoincrement())
  nome       String        @unique
  descricao  String
  roles      RoleGroups[]
  users      GroupUser[]
}
 
model GroupUser {
  id       Int   @id @default(autoincrement())
  user     User  @relation(fields: [userId], references: [id])
  userId   Int
  group    Group @relation(fields: [groupId], references: [id])
  groupId  Int
 
  @@unique([userId, groupId], name: "userId_groupId")
}
 
model RoleGroups {
  id       Int   @id @default(autoincrement())
  group    Group @relation(fields: [groupId], references: [id])
  groupId  Int
  role     Role  @relation(fields: [roleId], references: [id])
  roleId   Int
 
  @@unique([groupId, roleId], name: "groupId_roleId")
}
```
 
---
 
## API — Endpoints: Usuários (Users)
 
1.1 Criar usuário  
- Rota: POST /users  
- Headers: Content-Type: application/json  
- Body:
```json
{
  "name": "string com o nome do usuário",
  "cpf": "string com o CPF do usuário",
  "email": "string com o email do usuário",
  "phone": "string com o telefone do usuário",
  "pass": "string com a senha do usuário",
  "endereco": "string com o endereço do usuário"
}
```
- Exemplo:
```json
{
  "name": "Rafaela",
  "cpf": "413.323.028-07",
  "email": "rafaela843@gmail.com",
  "phone": "(16) 91000-5675",
  "pass": "123",
  "endereco": "Rua Carlos Botelho, 1002"
}
```
- Respostas:
  - 201: sucesso no cadastro (Location: rota do usuário criado)
  - 400: falha (CPF inválido ou campos obrigatórios faltando)
  - 500: erro interno
 
---
 
1.2 Consultar usuário por ID  
- Rota: GET /users/:id  
- Query: id (no path)  
- Body: nenhum  
- Respostas:
  - 200: sucesso — Body:
```json
{
  "id": 1,
  "name": "Rafaela Saraiva",
  "cpf": "787.361.850-19",
  "email": "rafaela843@gmail.com",
  "phone": "(16) 91000-5675",
  "endereco": "Rua Carlos Botelho, 1002"
}
```
  - 400: id inválido
  - 404: usuário não encontrado
  - 500: erro interno
 
---
 
1.3 Listar todos os usuários (com filtro por nome)  
- Rota: GET /users  
- Query (opcional): name  
- Exemplo: GET /users?name=Rafaela%20Saraiva  
- Respostas:
  - 200: sucesso — Body: array de usuários
  - 500: erro interno
 
Exemplo de retorno:
```json
[
  {
    "id": 1,
    "name": "Rafaela Saraiva",
    "cpf": "413.323.028-07",
    "email": "rafaela843@gmail.com",
    "phone": "(16) 91000-5675",
    "endereco": "Rua Carlos Botelho, 1002"
  }
]
```
 
---
 
1.4 Atualizar usuário  
- Rota: PUT /users/:id  
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer <token>
- Body: campos a atualizar (ex: name, cpf, email, phone, endereco)
- Exemplo:
```json
{
  "name": "Rafaela Saraiva",
  "email": "rafaela.saraiva@gmail.com",
  "cpf": "189.458.789-11",
  "phone": "(16) 91235-5678"
}
```
- Respostas:
  - 200: sucesso na atualização
  - 400: CPF inválido ou dados inválidos
  - 404: usuário não encontrado
  - 500: erro interno
 
---
 
1.5 Deletar usuário  
- Rota: DELETE /users/:id  
- Query: id no path  
- Respostas:
  - 200: sucesso na remoção
  - 400: id inválido
  - 404: usuário não encontrado
  - 500: erro interno
 
---
 
1.6 Login do usuário  
- Rota: POST /users/login  
- Headers: Content-Type: application/json  
- Body:
```json
{
  "email": "string com email do usuário",
  "senha": "string com a senha do usuário"
}
```
- Exemplo:
```json
{
  "email": "john4.@gmail.com",
  "senha": "123456"
}
```
- Respostas:
  - 200: sucesso — Body:
```json
{
  "token": "jwt_token_aqui"
}
```
  - 401: credenciais inválidas
  - 404: usuário não encontrado
  - 500: erro interno
 
---
 
 ## API — Endpoints: Animais (Animals)

2.1 Criar animal

Rota: POST /animals

Descrição: Cadastra um novo animal no sistema.

Headers:

Content-Type: application/json

Authorization: Bearer <token> (somente usuários autenticados podem criar)

Body:

{
  "nome": "string com o nome do animal",
  "especie": "string com a espécie (ex.: gato, cachorro)",
  "raca": "string com a raça (opcional)",
  "idade": 3,
  "sexo": "M/F",
  "descricao": "string com informações adicionais (opcional)",
  "status": "disponivel"
}


Exemplo:

{
  "nome": "Luna",
  "especie": "Gato",
  "raca": "Siamês",
  "idade": 2,
  "sexo": "F",
  "descricao": "Gatinha dócil e vacinada",
  "status": "disponivel"
}


Respostas:

201 Created: sucesso no cadastro

400 Bad Request: campos obrigatórios ausentes

401 Unauthorized: token ausente ou inválido

500 Internal Server Error: erro no servidor

2.2 Consultar animal por ID

Rota: GET /animals/:id

Descrição: Retorna os dados de um animal específico.

Query: id (no path)

Body: nenhum

Exemplo de resposta (200):

{
  "id": 1,
  "nome": "Luna",
  "especie": "Gato",
  "raca": "Siamês",
  "idade": 2,
  "sexo": "F",
  "descricao": "Gatinha dócil e vacinada",
  "status": "disponivel",
  "createdAt": "2025-10-21T19:30:00.000Z",
  "userId": 3,
  "shelterId": 1
}


Status codes possíveis:

200 OK: sucesso

400 Bad Request: id inválido

404 Not Found: animal não encontrado

500 Internal Server Error: erro interno

2.3 Listar todos os animais (com filtros opcionais)

Rota: GET /animals

Descrição: Retorna todos os animais cadastrados.

Query Params (opcionais):

especie — filtra por espécie

status — ex.: “disponivel” ou “adotado”

nome — busca por nome parcial

Exemplo:
GET /animals?especie=Gato&status=disponivel

Exemplo de resposta (200):

[
  {
    "id": 1,
    "nome": "Luna",
    "especie": "Gato",
    "raca": "Siamês",
    "idade": 2,
    "sexo": "F",
    "descricao": "Gatinha dócil e vacinada",
    "status": "disponivel"
  },
  {
    "id": 2,
    "nome": "Rex",
    "especie": "Cachorro",
    "raca": "Labrador",
    "idade": 4,
    "sexo": "M",
    "descricao": "Brincalhão e amigável",
    "status": "adotado"
  }
]


Status codes:

200 OK: sucesso

500 Internal Server Error: erro no servidor

2.4 Atualizar animal

Rota: PUT /animals/:id

Descrição: Atualiza as informações de um animal existente.

Headers:

Content-Type: application/json

Authorization: Bearer <token>

Body (campos opcionais):

{
  "nome": "Luna",
  "raca": "Siamês Misturado",
  "idade": 3,
  "descricao": "Gata vacinada e castrada",
  "status": "adotado"
}


Respostas:

200 OK: sucesso

400 Bad Request: dados inválidos

401 Unauthorized: token inválido

404 Not Found: animal não encontrado

500 Internal Server Error: erro interno

2.5 Deletar animal

Rota: DELETE /animals/:id

Descrição: Remove um animal do sistema.

Headers:

Authorization: Bearer <token>

Query: id (no path)

Respostas:

200 OK: sucesso na remoção

400 Bad Request: id inválido

401 Unauthorized: token ausente/inválido

404 Not Found: animal não encontrado

500 Internal Server Error: erro interno

2.6 Listar animais disponíveis para adoção

Rota: GET /animals/available

Descrição: Retorna todos os animais com status = "disponivel".

Respostas:

200 OK

[
  {
    "id": 1,
    "nome": "Luna",
    "especie": "Gato",
    "raca": "Siamês",
    "idade": 2,
    "sexo": "F",
    "descricao": "Gatinha dócil e vacinada"
  },
  {
    "id": 3,
    "nome": "Thor",
    "especie": "Cachorro",
    "raca": "Vira-lata",
    "idade": 1,
    "sexo": "M",
    "descricao": "Energia alta e adora passear"
  }
]


500 Internal Server Error: erro no servidor

Créditos e versão

Versão da API: 1.0.0
Última atualização: 22/10/2025
Desenvolvido por: Equipe Novo Amigo 🐾
Projeto Integrador — Senac

## Observações e boas práticas
- Valide CPF, e-mail e outros campos no backend antes de persistir.  
- Armazene senhas com bcrypt (hash + salt).  
- Proteja rotas sensíveis com JWT e verificação de papéis/permissões.  
- Em ambientes de produção, use PostgreSQL ou outro SGBD robusto; SQLite é útil apenas para testes locais.  
- Considere adicionar OpenAPI / Swagger para documentar toda a API de forma interativa.
 
## Próximos passos que posso fazer para você (escolha o que quiser)
- Gerar as rotas e documentação completa para Animals, Shelter, Adoption, Roles/Groups.  
- Transformar essa documentação em um arquivo `docs/` com endpoints categorizados.  
- Gerar um arquivo OpenAPI (YAML/JSON) com base nos endpoints que você já tem.  
- Criar e commitar este README.md diretamente no repositório (me diga qual: frontend/novo-amigo ou backend/projeto-adocao-animais).
