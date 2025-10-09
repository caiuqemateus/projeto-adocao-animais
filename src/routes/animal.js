import { Router } from 'express';
import { AnimalController } from '../controllers/Animal.js';
import {verificaToken} from '../middlewares/auth.js';
import { verificaRole } from '../middlewares/roles.js';

const route = Router();

route.post('/',verificaToken,verificaRole(["POBRE", "EDITOR", "ADMIN"]) ,AnimalController.store);
route.get('/:id',verificaRole(["VIEWER"]), AnimalController.show);
route.delete('/:id',AnimalController.del);
route.put('/:id',verificaToken ,verificaRole(["POBRE", "EDITOR", "ADMIN"]) ,AnimalController.upd);
route.get('/',AnimalController.index);



export default route;

