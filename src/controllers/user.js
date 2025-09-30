import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';


//nome da funcao (recebendo,responder,proximo)
export const UserController= {
    async store(req, res, next){
        try{
            const {email, pass, name,  cpf, phone, endereco } = req.body;

            /*if(!validaCPF(cpf)){
                res.status(401).json(u)({error:"Cpf não encontrado"})
            }*/
            const hash = await bcrypt.hash(pass, 10);

            const u = await prisma.user.create({
                data: { 
                     
                    email, 
                    pass: hash,
                    name,   
                    cpf, 
                    phone,
                    endereco

                }
            });
          
            res.status(201).json(u);
        }catch(err){
            next(err);
        }
    },
    async index(req, res, next){
        let query = {}

        if (req.query.name) query.name = {contains: req.query.name}

        const users = await prisma.user.findMany({
            where: query 
        })

        res.status(200).json(users)
    },

    async show(req, res, next){
        try{
            const id = Number( req.params.id)

            let u = await prisma.user.findFirstOrThrow({where: {id}})

            res.status(200).json(u)
        }catch(err){
            console.log(err)
            next(err);
        }
    },

    async del(req, res, next){
        try{
            const id = Number( req.params.id)

            const u = await prisma.user.delete({where: {id}})

            res.status(200).json(u)
        }catch(err){
            console.log(err)
            next(err);
        }
    },


    async upd(req, res, next){
        try{
            const id = Number( req.params.id)

            let body = {};

            if (req.body.name) body.name = req.body.name
            if (req.body.email) body.email = req.body.email
            if (req.body.cpf) body.cpf = req.body.cpf
            if (req.body.phone) body.phone = req.body.phone
            if (req.body.endereco) body.endereco = req.body.endereco

            const u = await prisma.user.update({
                where: { id },
                data: body
            });

            res.status(200).json(u)
        }catch(err){
            console.log(err)
            next(err);
        }
    },

    async login(req, res, next){
        try{
            const {email, senha} = req.body;

            let u = await prisma.user.findFirst({
                where: {email: email}
            })

            if(!u){
                res.status(404).json({error:"Não tem um usuário com esse e-mail"});
                return;
            }

            const ok = await bcrypt.compare(senha, u.pass);
            if (!ok) return res.status(401).json({erro: "Credenciais inválida"});

            //gera jwt (PAYLOAD MINIMO)
            const token = jwt.sign(
                {sub: u.id, email: u.email, name: u.name},
                process.env.JWT_SECRET,
                {expiresIn: '8h'}
            );

            return res.json({ token});
        }catch(e){
            next(e);
        }
    },
    
}            
