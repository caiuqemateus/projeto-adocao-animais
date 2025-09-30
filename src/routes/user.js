import { Router } from 'express';
import { UserController } from '../controllers/user.js';
import {verificaToken} from '../middlewares/auth.js';

const route = Router();

route.post('/', UserController.store);
route.get('/:id',UserController.show);
route.get('/',UserController.index);
route.post('/:login',UserController.login);
route.delete('/:id',verificaToken,UserController.del);
route.put('/:id', verificaToken, UserController.upd);



export default route;