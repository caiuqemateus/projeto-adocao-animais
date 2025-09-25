import prisma from '../prisma.js';

//nome da funcao (recebendo,responder,proximo)
export const AdoptionController= {
    async store(req, res, next){
        try{
            const {adotanteId, animalId, dataAdocao } = req.body;

            const a = await prisma.adoption.create({
                data: { 
                    adotanteId, 
                    animalId,
                    dataAdocao: dataAdocao ? new Date(dataAdocao) : new Date()
                }
            });
          
            res.status(201).json(a);
        }catch(err){
            next(err);
        }
    },
    async index(req, res, next){
        let query = {}

        if (req.query.adotanteId) query.adotanteId = Number(req.query.adotanteId)
        if (req.query.animalId) query.animalId = Number(req.query.animalId)

        const adoptions = await prisma.adoption.findMany({
            where: query,
            include: {
                adotante: true,
                animal: true
            }
        })

        res.status(200).json(adoptions)
    },

    async show(req, res, _next){
        try{
            const id = Number( req.params.id)

            let a = await prisma.adoption.findFirstOrThrow({
                where: {id},
                include: {
                    adotante: true,
                    animal: true
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

            const a = await prisma.adoption.delete({where: {id}})

            res.status(200).json(a)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },

    async upd(req, res, _next){
        try{
            const id = Number( req.params.id)

            let body = {};

            if (req.body.dataAdocao) body.dataAdocao = new Date(req.body.dataAdocao)

            const a = await prisma.adoption.update({
                where: { id },
                data: body
            });

            res.status(200).json(a)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },
}            

