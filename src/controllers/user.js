import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';
import { logAudit } from '../helpers/audit.js';

function validaCPF(input) {
  const cpf = String(input).replace(/\D+/g, '');

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const digits = cpf.split('').map(Number);

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += digits[i] * (10 - i);
  let d1 = 11 - (sum % 11);
  if (d1 >= 10) d1 = 0;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += digits[i] * (11 - i);
  let d2 = 11 - (sum % 11);
  if (d2 >= 10) d2 = 0;

  return d1 === digits[9] && d2 === digits[10];
}

function validaSenha(senha) {
  const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  return regex.test(senha);
}

export const UserController = {

  async store(req, res, next) {
    try {
      const { email, senha, nome, cpf, telefone, endereco } = req.body;

      if (!validaSenha(senha)) {
        return res.status(400).json({
          error: "A senha deve ter no mínimo 6 caracteres e um caractere especial"
        });
      }

      if (cpf && !validaCPF(cpf)) {
        return res.status(400).json({ error: "CPF inválido" });
      }

      const hash = await bcrypt.hash(senha, 10);

      const u = await prisma.user.create({
        data: {
          email,
          pass: hash,
          name: nome,
          cpf: cpf || null,
          phone: telefone || null,
          endereco: endereco || null,
          status: true
        }
      });

      // 🔥 AUDITORIA (CRIAR USUÁRIO)
      await logAudit({
       action: "CREATE",
        entity: "USER",
        entityId: u.id,
        user: {
          id: u.id,
          email: u.email,
         tipo: "USER"
      }
});
      res.status(201).json(u);

    } catch (err) {
      next(err);
    }
  },
   async index(req, res) {
    let query = {};

    if (req.query.name) {
      query.name = { contains: req.query.name };
    }

    const users = await prisma.user.findMany({
      where: query
    });

    res.status(200).json(users);
  },

  async show(req, res, next) {
    try {
      const id = Number(req.params.id);

      const u = await prisma.user.findFirstOrThrow({
        where: { id }
      });

      res.status(200).json(u);

    } catch (err) {
      next(err);
    }
  },

  async del(req, res, next) {
    try {
      const id = Number(req.params.id);

      const u = await prisma.user.delete({
        where: { id }
      });

      // 🔥 AUDITORIA (DELETAR)
      await logAudit({
        action: "DELETE",
        entity: "USER",
        entityId: id,
        userEmail: req.logado?.email
      });

      res.status(200).json(u);

    } catch (err) {
      next(err);
    }
  },

  async upd(req, res, next) {
    try {
      const id = Number(req.params.id);
      let body = {};

      if (req.body.name) body.name = req.body.name;
      if (req.body.email) body.email = req.body.email;

      if (req.body.status !== undefined) {
        body.status = req.body.status;
      }

      if (req.body.pass) {
        if (!validaSenha(req.body.pass)) {
          return res.status(400).json({
            error: "A senha deve ter no mínimo 6 caracteres e um caractere especial"
          });
        }

        const hash = await bcrypt.hash(req.body.pass, 10);
        body.pass = hash;
      }

      if (req.body.cpf) {
        if (!validaCPF(req.body.cpf)) {
          return res.status(400).json({ error: "CPF inválido" });
        }
        body.cpf = req.body.cpf;
      }

      if (req.body.phone) body.phone = req.body.phone;
      if (req.body.endereco) body.endereco = req.body.endereco;

      const u = await prisma.user.update({
        where: { id },
        data: body
      });

      // 🔥 AUDITORIA (UPDATE)
      await logAudit({
        action: "UPDATE",
        entity: "USER",
        entityId: id,
        userEmail: req.logado?.email
      });

      res.status(200).json(u);

    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, senha } = req.body;

      const u = await prisma.user.findFirst({
        where: { email }
      });

      if (!u) {
        return res.status(404).json({ error: "Não tem um usuário com esse e-mail" });
      }

      if (u.status === false) {
        return res.status(403).json({ error: "Usuário desativado" });
      }

      const ok = await bcrypt.compare(senha, u.pass);
      if (!ok) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { sub: u.id, email: u.email, name: u.name },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      return res.json({
        token,
        usuario: {
          id: u.id,
          email: u.email,
          nome: u.name
        }
      });

    } catch (e) {
      next(e);
    }
  },
  async me(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.logado.id },
        include: {
          group: {
            include: {
              group: { select: { nome: true } }
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const groups = user.group.map((g) => g.group.nome);

      res.json({
        id: user.id,
        email: user.email,
        nome: user.name,
        status: user.status,
        groups,
      });

    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }
};