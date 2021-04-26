import { Router } from 'express';
import IndexController from '../controllers/IndexController'

const router = Router();

router.post('/signin/', IndexController.AuthController.signIn);
router.post('/signout/', IndexController.AuthController.signOut);

export default router;