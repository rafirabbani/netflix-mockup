import { Router } from 'express'
import IndexController from '../controllers/IndexController'

const casts = IndexController.CastsController

const router = Router();

router.post ('/create/cast', /* IndexController.AuthController.requireSignIn, */ casts.createCasts)
router.get('/', casts.findAllCasts)
router.get('/:id', /* IndexController.AuthController.requireSignIn, */ casts.findCast)
router.get('/movie/:id', casts.findCastOnMovie)
router.delete('/:id', /* IndexController.AuthController.requireSignIn,  */casts.deleteCast)
router.put('/edit/:id', /* IndexController.AuthController.requireSignIn, */ casts.editCast)
router.get('/image/:id', casts.downloadCastImage)

export default router