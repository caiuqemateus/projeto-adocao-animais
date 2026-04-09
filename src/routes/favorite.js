import { Router } from 'express';
import { check, del, index, store } from '../controllers/Favorite.js';

const router = Router();

router.get('/', index);
router.post('/', store);
router.delete('/:animalId', del);
router.get('/check/:animalId', check);

export default router;
