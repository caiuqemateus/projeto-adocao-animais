import { Router } from 'express';
import { UserController } from '../controllers/user.js';
import {verificaToken} from '../middlewares/auth.js';

const route = Router();

route.post('/', UserController.store);
route.get('/:id',UserController.show);
route.get('/',UserController.index);
route.post('/:login',UserController.login);
route.delete('/:id',verificaToken, verificaRole(["ADMIN"]),UserController.del);
route.put('/:id', verificaToken, verificaRole(["ADMIN", "EDITOR"]), UserController.upd);



export default route;