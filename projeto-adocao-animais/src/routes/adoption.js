import { Router } from 'express';
import { AdoptionController } from '../controllers/Adoption.js';

const route = Router();

route.post('/', AdoptionController.store);
route.get('/:id',AdoptionController.show);
route.delete('/:id',AdoptionController.del);
route.put('/:id', AdoptionController.upd);
route.get('/',AdoptionController.index);



export default route;

