import { Router } from 'express';
import { UserController } from '../controllers/user.js';
import {verificaToken} from '../middlewares/auth.js';
import {verificaRole} from '../middlewares/roles.js'

const route = Router();

route.post('/', UserController.store);
route.post('/login', UserController.login);
route.get('/me', verificaToken, UserController.me);
route.get('/:id', UserController.show);
route.get('/', UserController.index);
route.delete('/:id', verificaToken, verificaRole(["ADMIN"]), UserController.del);
route.put('/:id', UserController.upd);


export default route;