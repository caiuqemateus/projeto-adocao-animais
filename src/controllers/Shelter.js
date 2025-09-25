import prisma from '../prisma.js';

//nome da funcao (recebendo,responder,proximo)
export const ShelterController= {
    async store(req, res, next){
        try{
            const {nome, cnpj, endereco, telefone, responsavel, urlImage, isActive } = req.body;

            if(endereco.length > 244){
                res.status(401).json({'erro':"Quantidade de caracteres do endereço ultrapassam 244"})
            };

            const s = await prisma.shelter.create({
                data: { 
                    nome, 
                    cnpj,
                    endereco,   
                    telefone, 
                    responsavel,
                    urlImage,
                    isActive
                }
            });
          
            res.status(201).json(s);
        }catch(err){
            next(err);
        }
    },
    async index(req, res, next){
        let query = {}

        if (req.query.nome) query.nome = {contains: req.query.nome}
        if (req.query.isActive) query.isActive = req.query.isActive === 'true'

        const shelters = await prisma.shelter.findMany({
            where: query,
            include: {
                animals: true
            }
        })

        res.status(200).json(shelters)
    },

    async show(req, res, _next){
        try{
            const id = Number( req.params.id)

            let s = await prisma.shelter.findFirstOrThrow({
                where: {id},
                include: {
                    animals: true
                }
            })

            res.status(200).json(s)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },

    async del(req, res, _next){
        try{
            const id = Number( req.params.id)

            const s = await prisma.shelter.delete({where: {id}})

            res.status(200).json(s)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },

    async upd(req, res, _next){
        try{
            const id = Number( req.params.id)

            let body = {};

            if (req.body.nome) body.nome = req.body.nome
            if (req.body.cnpj) body.cnpj = req.body.cnpj
            if (req.body.endereco) body.endereco = req.body.endereco
            if (req.body.telefone) body.telefone = req.body.telefone
            if (req.body.responsavel) body.responsavel = req.body.responsavel
            if (req.body.urlImage) body.urlImage = req.body.urlImage
            if (req.body.isActive !== undefined) body.isActive = req.body.isActive

            const s = await prisma.shelter.update({
                where: { id },
                data: body
            });

            res.status(200).json(s)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },
}            

