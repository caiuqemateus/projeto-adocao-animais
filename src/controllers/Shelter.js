import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';
import { logAudit } from '../helpers/audit.js';

export const ShelterController= {

    async store(req, res, next){
        try{
            const { nome, cnpj, endereco, telefone, responsavel, urlImage, isActive, email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha sao obrigatorios" });
            }

            if (senha.length < 6) {
                return res.status(400).json({ error: "A senha deve ter no minimo 6 caracteres" });
            }

            if (endereco && endereco.length > 244){
                return res.status(400).json({
                  error: "Quantidade de caracteres do endereco ultrapassam 244"
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
                return res.status(401).json({ error: "Usuario nao logado" })
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
            res.status(404).json({ error: "Nao encontrado" });
        }
    },

    async del(req, res){
        try{
            const id = Number(req.params.id)

            const s = await prisma.shelter.delete({ where: { id } })

            await logAudit({
                action: "DELETE",
                entity: "SHELTER",
                entityId: id,
                user: req.logado
            });

            res.status(200).json(s)

        }catch{
            res.status(404).json({ error: "Nao encontrado" });
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
            if (Array.isArray(req.body.mensages)) body.mensages = req.body.mensages

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
            res.status(404).json({ error: "Nao encontrado" });
        }
    },

    async requestContact(req, res, next) {
        try {
            const shelterId = Number(req.params.id);
            const userId = Number(req.logado?.id);
            const userTipo = req.logado?.tipo || 'usuario';
            const { animalId, animalNome, userTelefone } = req.body || {};

            if (!req.logado?.id) {
                return res.status(401).json({ error: 'Usuario nao autenticado' });
            }

            if (userTipo === 'shelter') {
                return res.status(403).json({ error: 'ONG nao pode enviar solicitacao para outra ONG.' });
            }

            if (!Number.isFinite(shelterId) || shelterId <= 0) {
                return res.status(400).json({ error: 'ONG invalida.' });
            }

            if (!animalId) {
                return res.status(400).json({ error: 'animalId e obrigatorio.' });
            }

            const [shelter, user, animal] = await Promise.all([
                prisma.shelter.findFirstOrThrow({ where: { id: shelterId } }),
                prisma.user.findFirstOrThrow({ where: { id: userId } }),
                prisma.animal.findFirstOrThrow({ where: { id: Number(animalId) } }),
            ]);

            if (animal.shelterId !== shelterId) {
                return res.status(400).json({ error: 'Este animal nao pertence a ONG informada.' });
            }

            const existingMessages = Array.isArray(shelter.mensages) ? shelter.mensages : [];
            const hasPendingDuplicate = existingMessages.some((raw) => {
                try {
                    const parsed = JSON.parse(raw);
                    return parsed?.type === 'adoption_request' &&
                        String(parsed?.animalId) === String(animal.id) &&
                        String(parsed?.userId) === String(user.id) &&
                        String(parsed?.status || 'PENDING') === 'PENDING';
                } catch {
                    return false;
                }
            });

            if (hasPendingDuplicate) {
                return res.status(409).json({ error: 'Voce ja enviou uma solicitacao pendente para este pet.' });
            }

            const payload = {
                id: `${Date.now()}-${user.id}-${animal.id}`,
                type: 'adoption_request',
                status: 'PENDING',
                createdAt: new Date().toISOString(),
                shelterId: shelter.id,
                animalId: String(animal.id),
                animalNome: animalNome || animal.nome,
                userId: String(user.id),
                userNome: user.name,
                userEmail: user.email,
                userTelefone: String(userTelefone || user.phone || ''),
            };

            await prisma.shelter.update({
                where: { id: shelter.id },
                data: {
                    mensages: [...existingMessages, JSON.stringify(payload)],
                }
            });

            return res.status(201).json({ message: 'Solicitacao enviada com sucesso.', requestId: payload.id });
        } catch (err) {
            next(err);
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
                return res.status(403).json({ error: "Esta ONG nao possui senha cadastrada" });
            }

            const ok = await bcrypt.compare(senha, s.pass);

            if (!ok) {
                return res.status(401).json({ error: "Credenciais invalidas" });
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
                isActive: s.status,
                mensages: s.mensages
            });

        } catch {
            res.status(404).json({ error: "ONG nao encontrada" });
        }
    },
};
