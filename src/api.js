import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'path';


import adoptionRoutes from './routes/adoption.js';
import animalRoutes from './routes/animal.js';
import shelterRoutes from './routes/shelter.js';
import uploadRoutes from './routes/upload.js';
import userRoutes from './routes/user.js';
import auditRoutes from './routes/audit.routes.js';
import contactMessageRoutes from './routes/contactMessage.js';

import { verificaToken } from './middlewares/auth.js';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/upload', uploadRoutes);
app.use('/users',userRoutes);
app.use('/animals',animalRoutes);
app.use('/shelters',shelterRoutes);
app.use('/adoptions',verificaToken, adoptionRoutes);
app.use('/audit', auditRoutes);
app.use('/messages', contactMessageRoutes);
app.use('/messages/my', contactMessageRoutes);

//Middleware de erro simples
app.use((err, _req, res, _next) => {
    console.error(err);
    if (err.code === 'P2002'){
        return res.status(409).json({
            error: 'Registro duplicado (unique)'
        });
    }
    if (err.code === 'P2025'){
        return res.status(404).json({
            error: 'Registro não encontrado'
        });
    }
    if (err.code === 'P2011') {
        return res.status(400).json({ error: 'Valor nulo em campo obrigatório' });
    }
    if (err.code === 'P2003'){
        return res.status(404).json({
            error: 'Este registro tem dependência de outro campo'
        });
    }
    res.status(500).json({error: 'Erro interno'});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log (`http://localhost:${PORT}`));

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}

export default app;