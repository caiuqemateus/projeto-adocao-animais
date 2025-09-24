import prisma from '../prisma.js';

//nome da funcao (recebendo,responder,proximo)
export const PostController= {
    async store(req, res, next){
        try{
            const {titulo, descricao, imagem, userId } = req.body;

            const p = await prisma.post.create({
                data: { 
                    titulo, 
                    descricao,
                    imagem,   
                    userId
                }
            });
          
            res.status(201).json(p);
        }catch(err){
            next(err);
        }
    },
    async index(req, res, next){
        let query = {}

        if (req.query.titulo) query.titulo = {contains: req.query.titulo}
        if (req.query.userId) query.userId = Number(req.query.userId)

        const posts = await prisma.post.findMany({
            where: query,
            include: {
                user: true
            }
        })

        res.status(200).json(posts)
    },

    async show(req, res, _next){
        try{
            const id = Number( req.params.id)

            let p = await prisma.post.findFirstOrThrow({
                where: {id},
                include: {
                    user: true
                }
            })

            res.status(200).json(p)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },

    async del(req, res, _next){
        try{
            const id = Number( req.params.id)

            const p = await prisma.post.delete({where: {id}})

            res.status(200).json(p)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },

    async upd(req, res, _next){
        try{
            const id = Number( req.params.id)

            let body = {};

            if (req.body.titulo) body.titulo = req.body.titulo
            if (req.body.descricao) body.descricao = req.body.descricao
            if (req.body.imagem) body.imagem = req.body.imagem

            const p = await prisma.post.update({
                where: { id },
                data: body
            });

            res.status(200).json(p)
        }catch(err){
            res.status(404).json({error:"Não encontrado"});
        }
    },
}            

