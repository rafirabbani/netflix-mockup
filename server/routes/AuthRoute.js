import { Router } from 'express';
import IndexController from '../controllers/IndexController'

const auth = IndexController.AuthController

const router = Router();

router.post('/signin/', auth.signIn);
router.post('/signout/', auth.signOut);
router.post('/requiresignin/', auth.requireSignIn, auth.isSignIn)


export default router;