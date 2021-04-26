import { Router } from 'express'
import IndexController from '../controllers/IndexController'

const router = Router();
const auth = IndexController.AuthController
const user = IndexController.UsersController

router.post ('/signup', user.createUser)
router.get ('/', auth.requireSignIn, user.findAllUsers)
router.get ('/users-comments', auth.requireSignIn, user.findAllUsersAndComments)
router.get ('/:id/user-comments', auth.requireSignIn, user.findUserAndComments)
router.get ('/:id', auth.requireSignIn, user.findUser)
router.delete('/:id', auth.requireSignIn, user.deleteUser)
router.put('/:id', auth.requireSignIn, user.editUser)

export default router