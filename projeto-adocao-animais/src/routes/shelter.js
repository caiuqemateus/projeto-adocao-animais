import { Router } from 'express';
import { ShelterController } from '../controllers/Shelter.js';

const route = Router();

route.post('/', ShelterController.store);
route.get('/:id',ShelterController.show);
route.delete('/:id',ShelterController.del);
route.put('/:id', ShelterController.upd);
route.get('/',ShelterController.index);



export default route;

