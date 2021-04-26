import { Router } from 'express'
import IndexController from '../controllers/IndexController'

const router = Router();

router.get('/:folder/:id/', IndexController.AuthController.requireSignIn, IndexController.DownloadController.download)

export default router
