import jwt from 'jsonwebtoken';

export function verificaToken(req, res, next){
    const auth = req.headers.authorization || "";
    const token = auth.startWith("Bearer ") ? auth.slice(7) : null;

    if (!token) return res.status(401).json({erro: "Token não enviado"});

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // convenção: sub = id do usuário
        req.logado = { 
            id: payload.sub, 
            email: payload.email, 
            nome: payload.name
        };
    return next();
    }catch (e){
        return res.status(403).json({erro: "Token inváiido ou expirado"});
    }


}