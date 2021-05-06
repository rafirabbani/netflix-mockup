import { Router } from 'express'
import IndexController from '../controllers/IndexController'

const router = Router();
const comments = IndexController.CommentsController
const auth = IndexController.AuthController

router.post ('/', /* auth.requireSignIn, */ comments.createComment)
router.get('/', /* auth.requireSignIn,  */comments.findAllComments)
router.get('/:id', /* auth.requireSignIn, */ comments.findComment)
router.get('/movie/:id', /* auth.requireSignIn, */ comments.findCommentsOnMovie)
router.get('/user/:id', /* auth.requireSignIn, */ comments.findCommentsUser)
router.delete('/:id', /* auth.requireSignIn, */ comments.deleteComment)
router.put('/:id', /* auth.requireSignIn, */ comments.editComment)

export default router