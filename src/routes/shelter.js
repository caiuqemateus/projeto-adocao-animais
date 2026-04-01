import { Router } from 'express';
import { ShelterController } from '../controllers/Shelter.js';
import { verificaToken } from '../middlewares/auth.js';
import { verificaRole } from '../middlewares/roles.js';
const route = Router();

route.post('/', ShelterController.store);
route.post('/login', ShelterController.login);
route.get('/me', verificaToken, ShelterController.me);
route.get('/:id',verificaToken,verificaRole(["VIEWER"]), ShelterController.show);
route.delete('/:id', verificaToken, verificaRole(["EDITOR"]), ShelterController.del);
route.put('/:id', verificaToken, verificaRole(["EDITOR"]), ShelterController.upd);
route.get('/', ShelterController.index);



export default route;

