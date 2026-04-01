import { Router } from 'express';
import prisma from '../prisma.js';
import { verificaToken } from '../middlewares/auth.js';
import { verificaRole } from '../middlewares/roles.js';

const route = Router();

route.get(
  '/',
  verificaToken,
  verificaRole(["ADMIN"]),
  async (req, res) => {
    try {
      const logs = await prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.json(logs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar auditoria" });
    }
  }
);

export default route;