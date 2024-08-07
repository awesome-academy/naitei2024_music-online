import {
  getCreate,
  getDetail,
  getList,
  getUpdatePage,
  postCreate,
  postDelete,
  postUpdate,
} from '@src/controllers/admin/user.admin.controller';
import { CreateUserDto } from '@src/DTO/user/createUser';
import validateRequest from '@src/middleware/validate-request.middleware';
import { Router } from 'express';

const router = Router();

router.get('/', getList);
router.get('/create', getCreate);
router.post('/create', validateRequest(CreateUserDto), postCreate);
router.get('/:id', getDetail);
router.get('/update/:id', getUpdatePage);
router.put('/update/:id', validateRequest(CreateUserDto), postUpdate);
router.delete('/delete/:id', postDelete);

export default router;
