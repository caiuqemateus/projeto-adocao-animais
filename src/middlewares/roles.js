import prisma from '../prisma.js';

export function verificaRole(requiredRole){
    const need = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

    return async (req, res, next) => {
        try {
            const userId = req.logado?.id;
            if(!userId) return res.status(401).json({ error: 'Não autenticado' });

            // ONGs (shelters) passam direto — elas têm credenciais próprias
            if (req.logado.tipo === 'shelter') {
                return next();
            }

            const vinculo = await prisma.roleGroups.findFirst({
                where: {
                    role: { nome: { in: need }},
                    group: { users: { some: { userId } } },
                },
                select: { id: true }
            });

            if (!vinculo){
                return res.status(403).json({ error: 'Acesso negado.' })
            }

            return next();
        } catch (e) {
            console.error('verificaRole error:',e);
            return res.status(403).json({ error: 'O usuário não possui permissão' });
        }
    }
}