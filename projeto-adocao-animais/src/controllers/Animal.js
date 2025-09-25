import prisma from '../prisma.js';
 
export const AnimalController = {
    async store(req, res, next){
        try{
            const {nome, especie, raca, idade, sexo, descricao, status, userId, shelterId } = req.body;
           
            let u = await prisma.user.findFirst({
                where: {id: Number(userId)}
            });
 
            if(!u){
                res.status(301).json({'error':"Usuario informado não existe"});
                return
            }
 
            let s = await prisma.shelter.findFirst({
                where: {id: Number(shelterId)}
            });
 
            if(!s){
                res.status(301).json({'error':"Usuario informado não existe"});
                return
            }
            const a = await prisma.animal.create({
                data: {
                    nome,
                    especie,
                    raca,  
                    idade,
                    sexo,
                    descricao,
                    status,
                    userId,
                    shelterId
                }
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
        if (req.query.status) query.status = req.query.status
 
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
 
            res.status(200).json(a)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },
 
    async upd(req, res, _next){
        try{
            const id = Number( req.params.id)
 
            let body = {};
 
            if (req.body.nome) body.nome = req.body.nome
            if (req.body.especie) body.especie = req.body.especie
            if (req.body.raca) body.raca = req.body.raca
            if (req.body.idade) body.idade = req.body.idade
            if (req.body.sexo) body.sexo = req.body.sexo
            if (req.body.descricao) body.descricao = req.body.descricao
            if (req.body.status) body.status = req.body.status
            if (req.body.shelterId) body.shelterId = req.body.shelterId
 
            const a = await prisma.animal.update({
                where: { id },
                data: body
            });
 
            res.status(200).json(a)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },
}