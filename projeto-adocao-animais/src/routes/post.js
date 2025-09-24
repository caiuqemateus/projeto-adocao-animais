import { Router } from 'express';
import { PostController } from '../controllers/Post.js';

const route = Router();

route.post('/', PostController.store);
route.get('/:id',PostController.show);
route.delete('/:id',PostController.del);
route.put('/:id', PostController.upd);
route.get('/',PostController.index);



export default route;

