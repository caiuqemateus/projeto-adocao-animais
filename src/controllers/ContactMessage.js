import prisma from '../prisma.js';
import { logAudit } from '../helpers/audit.js';

export const ContactMessageController = {

  // 📩 enviar mensagem
  async store(req, res, next) {
    try {
      const { nome, email, mensagem } = req.body;

      const m = await prisma.contactMessage.create({
        data: {
          nome,
          email,
          mensagem,
          userId: req.userId // 🔥 ESSENCIAL
        }
      });

      await logAudit({
        action: "CREATE",
        entity: "MESSAGE",
        entityId: m.id,
        userEmail: email
      });

      res.status(201).json(m);
    } catch (err) {
      next(err);
    }
  },

  // 📋 admin
  async index(req, res) {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(messages);
  },

  // 💬 responder
  async reply(req, res) {
    try {
      const id = Number(req.params.id);
      const { resposta } = req.body;

      const m = await prisma.contactMessage.update({
        where: { id },
        data: { resposta }
      });

      await logAudit({
        action: "REPLY",
        entity: "MESSAGE",
        entityId: m.id,
        userEmail: req.logado?.email
      });

      res.json(m);
    } catch (err) {
      res.status(404).json({ error: "Mensagem não encontrada" });
    }
  },

  async delete(req, res) {
  try {
    const id = Number(req.params.id);

    const message = await prisma.contactMessage.findUnique({
      where: { id }
    });

    if (!message) {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }

    await prisma.contactMessage.delete({
      where: { id }
    });

    return res.json({ message: "Mensagem deletada" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar" });
  }
}
};