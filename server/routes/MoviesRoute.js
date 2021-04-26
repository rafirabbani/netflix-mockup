import { Router } from 'express'
import IndexController from '../controllers/IndexController'

const router = Router();
const movies = IndexController.MoviesController
const auth = IndexController.AuthController
//const upload = IndexController.UploadController


router.post ('/', auth.requireSignIn, movies.createMovie)
router.get('/', auth.requireSignIn,movies.findAllMovies)
router.get('/movies-casts', movies.findAllMoviesAndCasts)
router.get('/movies-comments', movies.findAllMoviesAndComments)
router.get('/:id/movie-casts', movies.findMovieAndCasts)
router.get('/:id/movie-comments', movies.findMovieAndComments)
router.get('/:id', movies.findMovie)
router.delete('/:id', auth.requireSignIn, movies.deleteMovie)
router.put('/:id', auth.requireSignIn, movies.editMovie)

export default router