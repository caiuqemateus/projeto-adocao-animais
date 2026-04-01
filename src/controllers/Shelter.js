import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';
import { logAudit } from '../helpers/audit.js';

export const ShelterController= {

    async store(req, res, next){
        try{
            const { nome, cnpj, endereco, telefone, responsavel, urlImage, isActive, email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }

            if (senha.length < 6) {
                return res.status(400).json({ error: "A senha deve ter no mínimo 6 caracteres" });
            }

            if (endereco && endereco.length > 244){
                return res.status(400).json({
                  error: "Quantidade de caracteres do endereço ultrapassam 244"
                });
            }

            const hash = await bcrypt.hash(senha, 10);

            const s = await prisma.shelter.create({
                data: { 
                    nome, 
                    email,
                    pass: hash,
                    cnpj,
                    endereco: endereco || null,   
                    telefone: telefone || null, 
                    responsavel: responsavel || null,
                    urlImage: Array.isArray(urlImage)
                        ? urlImage
                        : (urlImage ? [urlImage] : []),
                    status: isActive ?? true
                }
            });

            // 🔥 AUDITORIA CREATE
            await logAudit({
                action: "CREATE",
                entity: "SHELTER",
                entityId: s.id,
                user: req.logado
            });
          
            res.status(201).json({
                ...s,
                isActive: s.status
            });

        }catch(err){
            next(err);
        }
    },

    async index(req, res, next){
        try{
            let query = {}

            if (req.query.nome) {
                query.nome = {
                    contains: req.query.nome,
                    mode: "insensitive"
                }
            }

            if (req.query.isActive) {
                query.status = req.query.isActive === 'true'
            }

            const shelters = await prisma.shelter.findMany({
                where: query,
                include: {
                    animals: true
                }
            })

            const formatted = shelters.map(s => ({
                ...s,
                isActive: s.status
            }));

            res.status(200).json(formatted)

        }catch(err){
            next(err);
        }
    },

    async show(req, res){
        try{
            const id = Number(req.params.id)

            if(!req.logado?.id){
                return res.status(401).json({ error: "Usuário não logado" })
            }

            let s = await prisma.shelter.findFirstOrThrow({
                where: { id },
                include: {
                    animals: true
                }
            })

            res.status(200).json({
                ...s,
                isActive: s.status
            })

        }catch{
            res.status(404).json({ error: "Não encontrado" });
        }
    },

    async del(req, res){
        try{
            const id = Number(req.params.id)

            const s = await prisma.shelter.delete({ where: { id } })

            // 🔥 AUDITORIA DELETE
            await logAudit({
                action: "DELETE",
                entity: "SHELTER",
                entityId: id,
                user: req.logado
            });

            res.status(200).json(s)

        }catch{
            res.status(404).json({ error: "Não encontrado" });
        }
    },

    async upd(req, res){
        try{
            const id = Number(req.params.id)

            let body = {};

            if (req.body.nome) body.nome = req.body.nome
            if (req.body.cnpj) body.cnpj = req.body.cnpj
            if (req.body.endereco) body.endereco = req.body.endereco
            if (req.body.telefone) body.telefone = req.body.telefone
            if (req.body.responsavel) body.responsavel = req.body.responsavel

            if (req.body.urlImage) {
                body.urlImage = Array.isArray(req.body.urlImage)
                    ? req.body.urlImage
                    : [req.body.urlImage]
            }

            let action = "UPDATE";

            if (req.body.isActive !== undefined) {
                body.status = req.body.isActive;
                action = req.body.isActive ? "ACTIVATE" : "DEACTIVATE";
            }

            const s = await prisma.shelter.update({
                where: { id },
                data: body
            });

            // 🔥 AUDITORIA UPDATE / STATUS
            await logAudit({
                action,
                entity: "SHELTER",
                entityId: id,
                user: req.logado
            });

            res.status(200).json({
                ...s,
                isActive: s.status
            })

        }catch(err){
            console.error(err);
            res.status(404).json({ error: "Não encontrado" });
        }
    },

    async login(req, res, next) {
        try {
            const { email, senha } = req.body;

            const s = await prisma.shelter.findFirst({
                where: { email }
            });

            if (!s) {
                return res.status(404).json({ error: "Nenhuma ONG encontrada com esse e-mail" });
            }

            if (s.status === false) {
                return res.status(403).json({ error: "ONG desativada" });
            }

            if (!s.pass) {
                return res.status(403).json({ error: "Esta ONG não possui senha cadastrada" });
            }

            const ok = await bcrypt.compare(senha, s.pass);

            if (!ok) {
                return res.status(401).json({ error: "Credenciais inválidas" });
            }

            const token = jwt.sign(
                { sub: s.id, email: s.email, name: s.nome, tipo: 'shelter' },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            return res.json({
                token,
                shelter: {
                    id: s.id,
                    email: s.email,
                    nome: s.nome,
                    cnpj: s.cnpj,
                    telefone: s.telefone,
                    endereco: s.endereco,
                    urlImage: s.urlImage,
                    isActive: s.status
                }
            });

        } catch (err) {
            next(err);
        }
    },

    async me(req, res) {
        try {
            const id = Number(req.logado.id);

            const s = await prisma.shelter.findFirstOrThrow({ where: { id } });

            res.json({
                id: s.id,
                nome: s.nome,
                email: s.email,
                cnpj: s.cnpj,
                telefone: s.telefone,
                endereco: s.endereco,
                urlImage: s.urlImage,
                isActive: s.status
            });

        } catch {
            res.status(404).json({ error: "ONG não encontrada" });
        }
    },
};