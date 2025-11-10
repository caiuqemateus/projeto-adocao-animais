import prisma from '../prisma.js';

export function verificaRole(requiredRole){
    const need = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

    return async (req, res, next) => {
        try {
            const userId = req.logado?.id;
            if(!userId) return res.status(401).json({ erro: 'Não autenticado'});

            const vinculo = await prisma.roleGroups.findFirst({
                where: {
                    role: { nome: { in: need }},
                    group: { users: { some: { userId } } },
                },
                select: { id: true }
            });

            if (!vinculo){
                return req.status(403).json({ erro: 'Acesso negado.'})
            }

            return next();
        } catch (e) {
            console.error('verificaRole error:',e);
            return res.status(403).json({ erro: 'O usuario não possui permissão'});
        }
    }
}