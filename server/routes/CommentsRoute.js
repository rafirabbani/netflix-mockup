import { Router } from 'express'
import IndexController from '../controllers/IndexController'

const router = Router();
const comments = IndexController.CommentsController
const auth = IndexController.AuthController

router.post ('/', auth.requireSignIn, comments.createComment)
router.get('/', auth, comments.findAllComments)
router.get('/:id', auth, comments.findComment)
router.get('/movie/:id', auth, comments.findCommentsOnMovie)
router.get('/user/:id', auth, comments.findCommentsUser)
router.delete('/:id', auth, comments.deleteComment)
router.put('/:id', auth, comments.editComment)

export default router