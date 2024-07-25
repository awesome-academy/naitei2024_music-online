import { createGet, createPost, list } from '@src/controller/Song.controller';
import { uploadMedia } from '../middleware/multer.config';
import { Router } from 'express';

const router = Router();

router.get('/create', createGet);
router.post('/create', uploadMedia, createPost);

router.get('/', list);

export default router;