// prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

// Helpers idempotentes (usam únicos `nome`)
async function upsertRole({ nome, descricao }) {
  return prisma.role.upsert({
    where: { nome },
    update: { descricao },
    create: { nome, descricao }
  });
}

async function upsertGroup({ nome, descricao }) {
  return prisma.group.upsert({
    where: { nome },
    update: { descricao },
    create: { nome, descricao }
  });
}

// Vincula papel ao grupo (idempotente via @@unique([groupId, roleId]))
async function connectRoleToGroup({ groupId, roleId }) {
  return prisma.roleGroups.upsert({
    where: {
      // precisa de um identificador único. Criaremos um “composite key surrogate”
      // usando @@unique([groupId, roleId]) → Prisma exige um nome. Podemos usar um find+create:
      // Porém o upsert requer um unique. Alternativa: try/catch create.
      // Para usar upsert puro, crie um unique artificial:
      // @@unique([groupId, roleId], nome: "group_role_unique")
      groupId_roleId: { groupId, roleId } // nomeamos a unique como "groupId_roleId"
    },
    update: {},
    create: { groupId, roleId }
  });
}

// Vincula user ao grupo (idempotente via @@unique([userId, groupId]))
async function connectUserToGroup({ userId, groupId }) {
  return prisma.groupUser.upsert({
    where: {
      userId_groupId: { userId, groupId } // idem: nomeie a unique
    },
    update: {},
    create: { userId, groupId }
  });
}

async function main() {
  // 1) Cria Roles
  const rolesData = [
    { nome: 'ADMIN',   descricao: 'Acesso total ao sistema'},
    { nome: 'EDITOR',  descricao: 'Adicionar animais para adoção'},
    { nome: 'VIEWER',  descricao: 'Somente leitura'},
    { nome: 'OWNER',   descricao: 'Responsável pelo grupo/projeto' },
    { nome: 'DELETEANIMAL',   descricao: 'Pode deletar um animal' },
    { nome: 'POBRE',  descricao: 'Adicionar animais para adoção de forma limitada'}
  ];

  const roles = {};
  for (const r of rolesData) {
    const role = await upsertRole(r);
    roles[role.nome] = role; // roles.ADMIN, roles.EDITOR, etc, os nomes passados acimas
  }

  // 2) Cria Groups
  const groupsData = [
    { nome: 'Administrador',        descricao: 'Administradores do site' },
    { nome: 'ONG',descricao: 'ONGs habilitadas, podem adicionar varios animais' },
    { nome: 'Usuários',descricao: 'Adicionam animais' }
  ];

  const groups = {};
  for (const g of groupsData) {
    const group = await upsertGroup(g);
    groups[group.nome] = group; // groups['Turma TI43'], etc.
  }

  // 3) Vincula Roles aos Groups
  // Crie um nome para a unique composta no schema para permitir upsert,
  // ex: @@unique([groupId, roleId], nome: "group_role_unique")
  await connectRoleToGroup({ groupId: groups['Administrador'].id,        roleId: roles.ADMIN.id });
  await connectRoleToGroup({ groupId: groups['Administrador'].id,        roleId: roles.EDITOR.id });
  await connectRoleToGroup({ groupId: groups['Administrador'].id,        roleId: roles.VIEWER.id });
  await connectRoleToGroup({ groupId: groups['Administrador'].id,        roleId: roles.OWNER.id });
  await connectRoleToGroup({ groupId: groups['Administrador'].id,        roleId: roles.DELETEANIMAL.id });

  await connectRoleToGroup({ groupId: groups['ONG'].id, roleId: roles.EDITOR.id });
  await connectRoleToGroup({ groupId: groups['ONG'].id, roleId: roles.VIEWER.id });

  await connectRoleToGroup({ groupId: groups['Usuários'].id, roleId: roles.VIEWER.id });
  await connectRoleToGroup({ groupId: groups['Usuários'].id,        roleId: roles.POBRE.id });

  // 4) (Opcional) Vincula Users a Groups
  // Se já existir User com id 1 e 2, por exemplo:

  const hash = await bcrypt.hash("123456", 10);
  
  const u = await prisma.user.create({
      data: { 
           
          email: 'john4.@gmail.com', 
          pass: hash,
          name: 'John',   
          cpf: '419.323.028-07', 
          phone: '(16) 99618-4985',
          endereco:'1763 Rua Dona Alexandrina · São Carlos, São Paulo'

      }
  });
  try {
    await connectUserToGroup({ userId: u.id, groupId: groups['Administrador'].id });
  } catch {}

  console.log('Seed concluído com Roles, Groups, RoleGroup e GroupUser');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
