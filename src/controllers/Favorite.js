import prisma from '../prisma.js';

// GET /favorites — lista favoritos do usuário logado
export async function index(req, res, next) {
  try {
    const userId = Number(req.logado.id);

    const favoritos = await prisma.favorite.findMany({
      where: { userId },
      include: { animal: true },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(favoritos);
  } catch (err) {
    next(err);
  }
}

// POST /favorites — adiciona animal aos favoritos
export async function store(req, res, next) {
  try {
    const userId = Number(req.logado.id);
    const animalId = Number(req.body.animalId);

    if (!animalId || !Number.isFinite(animalId)) {
      return res.status(400).json({ error: 'animalId inválido' });
    }

    const animal = await prisma.animal.findUnique({ where: { id: animalId } });
    if (!animal) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    const existing = await prisma.favorite.findUnique({
      where: { userId_animalId: { userId, animalId } },
    });

    if (existing) {
      return res.status(409).json({ error: 'Animal já está nos favoritos' });
    }

    const favorito = await prisma.favorite.create({
      data: { userId, animalId },
    });

    return res.status(201).json(favorito);
  } catch (err) {
    next(err);
  }
}

// DELETE /favorites/:animalId — remove animal dos favoritos
export async function del(req, res, next) {
  try {
    const userId = Number(req.logado.id);
    const animalId = Number(req.params.animalId);

    if (!animalId || !Number.isFinite(animalId)) {
      return res.status(400).json({ error: 'animalId inválido' });
    }

    const existing = await prisma.favorite.findUnique({
      where: { userId_animalId: { userId, animalId } },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Favorito não encontrado' });
    }

    await prisma.favorite.delete({
      where: { userId_animalId: { userId, animalId } },
    });

    return res.json({ message: 'Favorito removido' });
  } catch (err) {
    next(err);
  }
}

// GET /favorites/check/:animalId — verifica se animal está nos favoritos
export async function check(req, res, next) {
  try {
    const userId = Number(req.logado.id);
    const animalId = Number(req.params.animalId);

    const existing = await prisma.favorite.findUnique({
      where: { userId_animalId: { userId, animalId } },
    });

    return res.json({ favorited: !!existing });
  } catch (err) {
    next(err);
  }
}
