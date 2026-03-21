# Lista de Tarefas — Site de Adoção de Animais

> Última atualização: 21/03/2026
> Legenda de prioridade: 🔴 Crítico | 🟡 Importante | 🟢 Melhoria

---

## 1. Header e Rodapé (Navegação)

- 🟡 **Header** — Remover botões que poluem a interface: **Animais Favoritos** e **Sobre** devem ser removidos da barra principal e reposicionados (ex: menu lateral, rodapé ou perfil do usuário)
- 🟡 **Rodapé** — Remover ou desativar botões/links que não têm função implementada
- 🟢 **Rodapé** — Corrigir links de redes sociais (todos estão com `href="#"` sem destino real)
- 🟢 **Rodapé** — Implementar ou remover o campo de newsletter (atualmente não envia para lugar nenhum)

---

## 2. Fale Conosco

- 🔴 **UI** — Redesenhar completamente a interface da página. O design atual não combina com o restante do site
- 🔴 **Formulário quebrado** — O formulário usa variáveis locais (`let`) em vez de `useState`, não captura os dados digitados e nunca envia nada para a API — apenas exibe um `alert()`. Precisa ser reescrito
- 🟡 **Backend** — Criar endpoint para receber mensagens/dúvidas dos usuários e armazená-las no banco de dados
- 🟡 **Painel de mensagens** — As mensagens enviadas pelos usuários devem aparecer em uma tela do painel administrativo, onde administradores possam ver e responder
- 🟢 **Mensagens para ONGs** — Avaliar se ONGs também devem poder receber mensagens diretas de usuários (feature futura)

---

## 3. Página Sobre

- 🟡 **Conteúdo** — A página **não foi atualizada há mais de 5 meses**. Revisar e completar o conteúdo institucional
- 🔴 **Layout** — Header e Footer estão **ausentes** na página. Adicionar os componentes de navegação

---

## 4. Tela de ONGs (nova)

- 🟡 **Criar tela de listagem de ONGs** — Ainda não foi feito nem planejado. Criar uma página pública listando as ONGs cadastradas com seus respectivos animais
- 🟡 **Criar tela de perfil de ONG** — Página individual para cada ONG com informações, animais disponíveis e forma de contato
- 🔴 **Login de ONG está quebrado** — O backend não tem endpoint de login para abrigos (`/shelters/login`). ONGs cadastradas não conseguem acessar o sistema. Criar endpoint e fluxo de autenticação para ONGs

---

## 5. Tela de Adoção / Animais

- 🟡 **Popular o banco de dados** — Cadastrar entre **100 e 200 animais** reais para simular um site funcional
- 🟡 **Criar ONGs de teste** — Cadastrar no mínimo **5 ONGs diferentes**, cada uma com seus próprios animais, para simular um ambiente real de adoção
- 🟡 **Home — redirecionamento** — Ao clicar em um animal na tela Home (carousel ou grid), o usuário deve ser redirecionado ao perfil do animal. Atualmente isso não ocorre
- 🟡 **Como funciona a adoção?** — Atualizar a seção explicativa com o fluxo real de adoção
- 🟡 **Planejar fluxo de adoção** — Definir como o usuário interessado em adotar acessa as informações de contato da ONG/dono após clicar em "Adotar"
- 🟢 **Categoria Exóticos** — Adicionar categoria de **animais exóticos** além das já existentes (cachorro, gato, pássaro, hamster, coelho, etc.)
- 🟢 **Verificar todos os filtros** — Confirmar que todos os filtros da tela de adoção funcionam corretamente com dados reais

---

## 6. Cadastro de Animal (Modal / Tela)

- 🟡 **UI** — Atualizar o design do modal/tela de cadastro de animal
- 🟡 **Múltiplas fotos** — Adicionar suporte para cadastrar mais de uma foto por animal
- 🟡 **Personalidade** — Adicionar campo de personalidade com tags como: `calmo`, `agitado`, `gosta de crianças`, `gosta de outros animais`, `independente`, `carinhoso`, etc.
- 🔴 **Dono hardcoded** — Atualmente o cadastro salva `donoId: '1'` e `donoNome: 'Nome da ONG Exemplo'` fixos no código. Corrigir para usar os dados do usuário logado
- 🟢 **Categoria Exóticos** — Incluir a nova categoria no formulário

---

## 7. Favoritos (múltiplos problemas)

- 🔴 **Botão de favoritar nos cards (tela de Adoção)** — O botão existe visualmente mas **não funciona**. Alterna apenas o estado local do React, sem salvar nada. Corrigir urgente
- 🔴 **Persistência no banco de dados** — Favoritos não são enviados para a API nem salvos no banco. Criar endpoint de favoritos e integrar ao frontend
- 🟡 **Botão de favoritar no perfil do animal** — O feedback visual é ruim. Não fica claro para o usuário se o animal foi favoritado ou não
- 🟡 **Desfavoritar no perfil** — Ao clicar no botão de favorito novamente no perfil do animal, nada acontece. Implementar o toggle de remoção
- 🟡 **UI da tela de Favoritos** — A interface da tela `/animais-favoritos` está muito simples e sem identidade visual. Redesenhar completamente
- 🟡 **Filtro por favoritos** — Adicionar opção de filtrar por animais favoritados na tela de Adoção
- 🟢 **Favoritos no perfil do usuário** — Os animais favoritados devem aparecer no perfil do usuário, com link direto para o perfil do animal

---

## 8. Perfil do Animal

- 🔴 **Botão "Entrar em Contato"** — O botão está presente mas **não funciona**. Implementar ação (ex: redirecionar para Fale Conosco, abrir modal com dados da ONG, ou enviar email)
- 🟡 **Tags de Personalidade** — Após implementar o campo de personalidade no cadastro, exibi-las no perfil do animal
- 🟡 **Múltiplas fotos** — Exibir galeria de imagens no perfil após implementar suporte a múltiplas fotos

---

## 9. Painel Administrativo (novo)

- 🟡 **Nova tela de painel** — Criar uma tela dedicada de painel administrativo (`/admin`) com abas separadas para cada categoria
- 🟡 **Aba: Gerenciar Usuários** — Criar nova UI com filtros (nome, email, status, role), tabela de usuários, ações de ativar/desativar/deletar
- 🟡 **Aba: Gerenciar Pets** — Criar nova UI com filtros (espécie, status, ONG), tabela/cards de animais, opções de editar e deletar
- 🟡 **Aba: Gerenciar ONGs** — Criar nova UI com filtros, listagem de ONGs, ações de ativar/desativar/deletar
- 🟡 **Aba: Auditoria** — Criar aba de auditoria para registrar e visualizar ações importantes realizadas no sistema (quem deletou, quem criou, etc.)
- 🟡 **Aba: Mensagens** — Painel para visualizar e responder mensagens enviadas pelo Fale Conosco
- 🔴 **Autenticação de admin hardcoded** — A verificação de admin está feita como `email === 'admin@pet.com'` no frontend. Corrigir para usar o sistema de roles/groups já implementado no backend

---

## 10. Perfil de Usuário

- 🟡 **UI** — O design atual da tela de perfil é muito simples. Redesenhar com informações mais organizadas e visualmente atraentes
- 🟡 **Animais favoritados** — Exibir no perfil do usuário a lista de animais que ele favoritou, com link para o perfil de cada animal

---

## 11. Dark Mode (Modo Escuro)

- 🔴 **Telas sem suporte a dark mode** — Implementar dark mode nas seguintes telas:
  - Gerenciar Usuários (`/admin/users`)
  - Gerenciar ONGs (`/admin/ong`)
  - Fale Conosco (`/faleConosco`)
  - Login (`/login`)
  - Criar Conta / Cadastrar ONG (`/cadastro`)
- 🟡 **Dark mode persiste após logout** — Ao sair da conta, o modo escuro continua ativo. Ao fazer logout, o sistema deve redefinir o tema para o padrão (claro)

---

## 12. Modal de Login

- 🟡 **UI** — Melhorar o design do modal de login. Está simples e fora do padrão visual do site
- 🟢 **Considerar criar página dedicada** — Avaliar transformar o modal em uma página completa de login (`/login`) em vez de pop-up

---

## 13. Tela de Criar Conta / Cadastro

- 🔴 **Criação de conta ONG não funciona** — Atualmente não é possível criar uma conta de ONG. Investigar e corrigir (o backend de `shelters` não aceita email/senha para autenticação)
- 🔴 **Fluxo pós-cadastro quebrado** — Após criar uma conta, aparece um pop-up com "Cadastro realizado com sucesso!" e um botão de "ir para login". Ao clicar, abre um pop-up de login, e após logar com sucesso, o sistema retorna ao pop-up de "Cadastro realizado com sucesso!" criando um **loop sem fim**. Corrigir para: ao criar conta → logar automaticamente → redirecionar para a Home
- 🔴 **Validação de senha em tempo real** — Quando o usuário digita senhas diferentes nos campos "Senha" e "Confirmar Senha", o erro não é exibido imediatamente. Implementar validação em tempo real com feedback visual instantâneo
- 🟡 **Barra de força de senha** — A barra indicadora de força da senha já aparece preenchida no meio mesmo antes de o usuário digitar qualquer caractere. Corrigir para iniciar em zero/vazio
- 🟡 **UI** — Melhorar o design completo da tela de cadastro

---

## 14. Segurança do Backend (Vulnerabilidades)

- 🔴 **`DELETE /animals/:id` sem autenticação** — Qualquer pessoa (sem login) pode deletar qualquer animal. Adicionar middleware `verificaToken` e role adequada
- 🔴 **`GET /users` sem proteção** — Lista todos os usuários (incluindo emails) sem exigir autenticação. Restringir para admin
- 🔴 **`PUT /users/:id` sem proteção** — Qualquer pessoa pode alterar dados de qualquer usuário sem autenticação
- 🔴 **`PUT /shelters/:id` sem proteção** — Qualquer pessoa pode alterar dados de uma ONG sem autenticação
- 🔴 **`DELETE /shelters/:id` sem proteção** — Qualquer pessoa pode deletar uma ONG sem autenticação

---

## 15. Endpoints Faltando no Backend

- 🟡 **`PUT /users/:id/status`** — Usado no frontend admin para ativar/desativar usuários, mas não existe no backend
- 🟡 **`PUT /users/:id/desativar`** — Usado na tela de configurações, mas não existe no backend
- 🟡 **`PUT /shelters/:id/status`** — Usado no frontend admin para ativar/desativar ONGs, mas não existe no backend
- 🟡 **`POST /shelters/login`** — ONGs precisam de um endpoint próprio de autenticação
- 🟡 **Endpoint de Favoritos** — Criar rotas: `POST /favorites`, `DELETE /favorites/:id`, `GET /favorites?userId=...` para persistir favoritos no banco

---

## 16. Inconsistências de Dados

- 🟡 **ID do animal: número vs. string** — O backend usa `id: Int` (número) e o frontend define `id: string` no modelo `Pet`. Isso pode causar bugs em comparações. Padronizar em ambos os lados
- 🟡 **Dados do usuário logado incompletos** — O endpoint `/users/me` retorna apenas `{id, email, nome}`, mas a tela de Configurações tenta acessar `phone` e `cpf` do contexto, que não existem. Expandir o retorno do endpoint
- 🟡 **`sampleAnimals.ts` desatualizado** — Arquivo de dados de exemplo usa campos antigos (`img`, `tipo`, `id: number`) incompatíveis com o modelo atual. Atualizar ou remover

---

## 17. Outros (Componentes e Telas Incompletos)

- 🔴 **`AdotarPetModal`** — O componente existe mas está **completamente vazio** (retorna `<></>`). Implementar o fluxo de adoção
- 🔴 **`Buscar`** — O componente existe mas está **completamente vazio** (retorna `<></>`). Implementar busca ou remover
- 🟡 **`/nossos-animais/[especie]`** — A página de filtro por espécie via URL não tem Header, Footer, cards visuais nem links para o perfil do animal. Corrigir layout
- 🟡 **Dashboard** — A página `/dashboard` é um placeholder vazio. Definir se será usada ou removida
- 🟢 **`ConnectionStatus`** — Componente de debug visível que não é necessário em produção. Remover ou ocultar em ambiente de produção
