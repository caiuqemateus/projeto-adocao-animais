import { Router } from 'express';
import { ContactMessageController } from '../controllers/ContactMessage.js';
import { verificaToken } from '../middlewares/auth.js';

const route = Router();

// público
route.post('/', ContactMessageController.store);

// admin
route.get('/', verificaToken, ContactMessageController.index);
route.put('/:id/reply', verificaToken, ContactMessageController.reply);

// ✅ ADICIONA ISSO AQUI
route.delete('/:id', verificaToken, ContactMessageController.delete);

export default route;