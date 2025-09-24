import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import adoptionRoutes from './routes/adoption.js';
import animalRoutes from './routes/animal.js';
import postRoutes from './routes/post.js';
import shelterRoutes from './routes/shelter.js';
import userRoutes from './routes/user.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users',userRoutes);
app.use('/animals',animalRoutes);
app.use('/shelters',shelterRoutes);
app.use('/adoptions',adoptionRoutes);
app.use('/posts',postRoutes);

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
    res.status(500).json({error: 'Erro interno'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log (`http://localhost:${PORT}`));


