import { Router } from 'express'
import IndexController from '../controllers/IndexController'

const router = Router();
const movies = IndexController.MoviesController
//const upload = IndexController.UploadController


router.post ('/', IndexController.AuthController.requireSignIn, movies.createMovie)
router.get('/', auth.requireSignIn,movies.findAllMovies)
router.get('/movies-casts', movies.findAllMoviesAndCasts)
router.get('/movies-comments', movies.findAllMoviesAndComments)
router.get('/:id/movie-casts', movies.findMovieAndCasts)
router.get('/:id/movie-comments', movies.findMovieAndComments)
router.get('/:id', movies.findMovie)
router.delete('/:id', IndexController.AuthController.requireSignIn, movies.deleteMovie)
router.put('/:id', IndexController.AuthController.requireSignIn, movies.editMovie)

export default router