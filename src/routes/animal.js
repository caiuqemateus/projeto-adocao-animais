import { Router } from 'express';
import { AnimalController } from '../controllers/Animal.js';
import {verificaToken} from '../middlewares/auth.js';

const route = Router();

route.post('/',verificaToken ,AnimalController.store);
route.get('/:id',AnimalController.show);
route.delete('/:id',AnimalController.del);
route.put('/:id',verificaToken ,AnimalController.upd);
route.get('/',AnimalController.index);



export default route;

