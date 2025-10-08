import { Router } from 'express';
import { ShelterController } from '../controllers/Shelter.js';
import {verificaToken} from '../middlewares/auth.js';
const route = Router();

route.post('/',verificaToken, ShelterController.store);
route.get('/:id',verificaToken, ShelterController.show);
route.delete('/:id', ShelterController.del);
route.put('/:id', ShelterController.upd);
route.get('/', ShelterController.index);



export default route;

