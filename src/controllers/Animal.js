import { logAudit } from '../helpers/audit.js';
import prisma from '../prisma.js';
export const AnimalController = {
    async store(req, res, next){
        try{
            const {nome, especie, vacinado, castrado, porte, foto, raca, idade, sexo, descricao, disponivel, tags, comoAdotar } = req.body;
            let { userId, shelterId } = req.body;
            
            if(descricao && descricao.length > 1000){
                return res.status(400).json({'erro':"Quantidade de caracteres da descrição ultrapassam 1000"});
            }

            if (!userId && !shelterId) {
                if (req.logado.tipo === 'shelter') {
                    shelterId = req.logado.id;
                } else {
                    userId = req.logado.id;
                }
            }

            if ((!userId && !shelterId) || (userId && shelterId)){
                return res.status(400).json({ error: "Cadastre apenas como ONG ou apenas como Usuário" });
            }

            let u = null;
            if (userId) {
                u = await prisma.user.findFirst({
                    where: { id: Number(userId) }
                });

                if(!u){
                    return res.status(400).json({ error: "Usuário informado não existe" });
                }
            }

            let data = {
                nome,
                foto: Array.isArray(foto) ? foto : (foto ? [foto] : []),
                especie,
                porte: porte || null,
                raca: raca || '',
                idade: idade ? Number(idade) : null,
                castrado: castrado === true || castrado === 'true',
                vacinado: vacinado === true || vacinado === 'true',
                sexo: sexo || null,
                descricao: descricao || null,
                comoAdotar: comoAdotar || null,
                tags: Array.isArray(tags) ? tags : [],
                disponivel: disponivel === false || disponivel === 'false' ? false : true,
            }

            if (userId) {
                data.userId = Number(userId);
            }

            let s = null;
            if (shelterId) {
                s = await prisma.shelter.findFirst({
                    where: { id: Number(shelterId) }
                });

                if(!s){
                    return res.status(400).json({ error: "Abrigo informado não existe" });
                }

                data.shelterId = Number(shelterId)
            }

               
            const a = await prisma.animal.create({
                data: data
            });

            // 🔥 AUDITORIA (CRIAR)
            await logAudit({
                action: "CREATE",
                entity: "ANIMAL",
                entityId: a.id,
                user: req.logado
            });
         
            res.status(201).json(a);
        }catch(err){
            next(err);
        }
    },
    async index(req, res, next){
        let query = {}

        if (req.query.nome) query.nome = {contains: req.query.nome}
        if (req.query.especie) query.especie = {contains: req.query.especie}
        if (req.query.porte) query.porte = {contains: req.query.porte}
        if (req.query.status) query.status = req.query.status
        if (req.query.vacinado) query.vacinado = req.query.vacinado
        if (req.query.castrado) query.castrado = req.query.castrado
        if (req.query.shelterId) query.shelterId = Number(req.query.shelterId)
 
        const animals = await prisma.animal.findMany({
            where: query,
            include: {
                user: true,
                shelter: true
            }
        })
 
        res.status(200).json(animals)
    },
 
    async show(req, res, _next){
        try{
            const id = Number( req.params.id)
            
            
            let a = await prisma.animal.findFirstOrThrow({
                where: {id},
                include: {
                    user: true,
                    shelter: true
                }
            })
 
            res.status(200).json(a)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },
 
    async del(req, res, _next){
        try{
            const id = Number( req.params.id)
 
            const a = await prisma.animal.delete({where: {id}})

             // 🔥 AUDITORIA (DELETAR)
            await logAudit({
                action: "DELETE",
                entity: "ANIMAL",
                entityId: id,
                user: req.logado
            });
 
            res.status(200).json(a)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },
 
    async upd(req, res, _next){
        try{
            const id = Number( req.params.id)
            if(!req.logado.id){
                return res.status(301).json({ error: "Usuário não logado" })
            }
            let body = {};
 
            if (req.body.nome) body.nome = req.body.nome
            if (req.body.especie) body.especie = req.body.especie
            if (req.body.porte) body.porte = req.body.porte
            if (req.body.raca) body.raca = req.body.raca
            if (req.body.idade) body.idade = req.body.idade
            if (req.body.sexo) body.sexo = req.body.sexo
            if (req.body.descricao) body.descricao = req.body.descricao
            if (req.body.disponivel !== undefined) {
             body.disponivel = req.body.disponivel === true || req.body.disponivel === 'true';
            }
            if (req.body.shelterId) body.shelterId = req.body.shelterId
 
            const a = await prisma.animal.update({
                where: { id },
                data: body
            });

            // 🔥 AUDITORIA (UPDATE)
            await logAudit({
                action: "UPDATE",
                entity: "ANIMAL",
                entityId: id,
                user: req.logado
            });
 
            res.status(200).json(a)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },
}