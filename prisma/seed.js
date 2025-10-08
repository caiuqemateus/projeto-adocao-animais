// prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Helpers idempotentes (usam únicos `name`)
async function upsertRole({ name, description }) {
  return prisma.role.upsert({
    where: { name },
    update: { description },
    create: { name, description }
  });
}

async function upsertGroup({ name, description }) {
  return prisma.group.upsert({
    where: { name },
    update: { description },
    create: { name, description }
  });
}

// Vincula papel ao grupo (idempotente via @@unique([groupId, roleId]))
async function connectRoleToGroup({ groupId, roleId }) {
  return prisma.roleGroup.upsert({
    where: {
      // precisa de um identificador único. Criaremos um “composite key surrogate”
      // usando @@unique([groupId, roleId]) → Prisma exige um nome. Podemos usar um find+create:
      // Porém o upsert requer um unique. Alternativa: try/catch create.
      // Para usar upsert puro, crie um unique artificial:
      // @@unique([groupId, roleId], name: "group_role_unique")
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
    { name: 'ADMIN',   description: 'Acesso total ao sistema'},
    { name: 'EDITOR',  description: 'Adicionar animais para adoção'},
    { name: 'VIEWER',  description: 'Somente leitura'},
    { name: 'OWNER',   description: 'Responsável pelo grupo/projeto' },
    { name: 'deleteAnimal',   description: 'Pode deletar um animal' },
    { name: 'POBRE',  description: 'Adicionar animais para adoção de forma limitada'}
  ];

  const roles = {};
  for (const r of rolesData) {
    const role = await upsertRole(r);
    roles[role.name] = role; // roles.ADMIN, roles.EDITOR, etc, os names passados acimas
  }

  // 2) Cria Groups
  const groupsData = [
    { name: 'Administrador',        description: 'Administradores do site' },
    { name: 'ONG',description: 'ONGs habilitadas, podem adicionar varios animais' },
    { name: 'Usuários',description: 'Adicionam animais' }
  ];

  const groups = {};
  for (const g of groupsData) {
    const group = await upsertGroup(g);
    groups[group.name] = group; // groups['Turma TI43'], etc.
  }

  // 3) Vincula Roles aos Groups
  // Crie um nome para a unique composta no schema para permitir upsert,
  // ex: @@unique([groupId, roleId], name: "group_role_unique")
  await connectRoleToGroup({ groupId: groups['Administrador'].id,        roleId: roles.ADMIN.id });
  await connectRoleToGroup({ groupId: groups['Administrador'].id,        roleId: roles.EDITOR.id });
  await connectRoleToGroup({ groupId: groups['Administrador'].id,        roleId: roles.VIEWER.id });
  await connectRoleToGroup({ groupId: groups['Administrador'].id,        roleId: roles.OWNER.id });
  await connectRoleToGroup({ groupId: groups['Administrador'].id,        roleId: roles.deleteAnimal.id });

  await connectRoleToGroup({ groupId: groups['ONG'].id, roleId: roles.EDITOR.id });
  await connectRoleToGroup({ groupId: groups['ONG'].id, roleId: roles.VIEWER.id });

  await connectRoleToGroup({ groupId: groups['Usuários'].id, roleId: roles.VIEWER.id });
  await connectRoleToGroup({ groupId: groups['Usuários'].id,        roleId: roles.POBRE.id });

  // 4) (Opcional) Vincula Users a Groups
  // Se já existir User com id 1 e 2, por exemplo:


  const u = await prisma.user.create({
      data: { 
           
          email: 'john3.@gmail.com', 
          pass: '123456',
          name: 'John',   
          cpf: '413.323.028-07', 
          phone: '(16) 99618-4985',
          endereco:'1763 Rua Dona Alexandrina · São Carlos, São Paulo'

      }
  });
  try {
    await connectUserToGroup({ userId: 1, groupId: groups['Administrador'].id });
  } catch {}

  console.log('Seed concluído com Roles, Groups, RoleGroup e GroupUser');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
