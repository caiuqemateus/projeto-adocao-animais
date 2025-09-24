import { Router } from 'express';
import { AnimalController } from '../controllers/Animal.js';

const route = Router();

route.post('/', AnimalController.store);
route.get('/:id',AnimalController.show);
route.delete('/:id',AnimalController.del);
route.put('/:id', AnimalController.upd);
route.get('/',AnimalController.index);



export default route;

