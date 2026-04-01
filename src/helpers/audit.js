import prisma from '../prisma.js';

export async function logAudit({ action, entity, entityId, user }) {
  await prisma.auditLog.create({
    data: {
      action,
      entity,
      entityId,
      userId: user?.id || null,
      userEmail: user?.email || "Sistema",
      userType: user?.tipo || "SYSTEM"
    }
  });
}