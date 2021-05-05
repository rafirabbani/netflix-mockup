import { Router } from 'express'
import IndexController from '../controllers/IndexController'

const router = Router();

router.post ('/', IndexController.AuthController.requireSignIn, IndexController.CastsController.createCasts)
router.get('/', IndexController.CastsController.findAllCasts)
router.get('/:id', IndexController.AuthController.requireSignIn, IndexController.CastsController.findCast)
router.get('/movie/:id', IndexController.CastsController.findCastOnMovie)
router.delete('/:id', IndexController.AuthController.requireSignIn, IndexController.CastsController.deleteCast)
router.put('/:id', IndexController.AuthController.requireSignIn, IndexController.CastsController.editCast)

export default router