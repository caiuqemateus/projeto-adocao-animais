import { Router } from 'express';
import { ContactMessageController } from '../controllers/ContactMessage.js';
import { verificaToken } from '../middlewares/auth.js';

const route = Router();

// público (fale conosco)
route.post('/', ContactMessageController.store);

// 🔥 PRIMEIRO ROTAS ESPECÍFICAS
route.get('/my', verificaToken, ContactMessageController.myMessages);

// admin
route.get('/', verificaToken, ContactMessageController.index);
route.put('/:id/reply', verificaToken, ContactMessageController.reply);

export default route;