import { Router } from 'express'
import IndexController from '../controllers/IndexController'

const router = Router();
const movies = IndexController.MoviesController
const auth = IndexController.AuthController
//const upload = IndexController.UploadController


router.post ('/create/movie', movies.createMovie)
router.get('/',movies.findAllMovies)
router.get('/movies-casts', movies.findAllMoviesAndCasts)
router.get('/movies-comments', movies.findAllMoviesAndComments)
router.get('/:id/movie-casts', movies.findMovieAndCasts)
router.get('/:id/movie-comments', movies.findMovieAndComments)
router.get('/:id', movies.findMovie)
router.get('/image/:id', movies.downloadMovieImage)
/* router.get('/image/:title/:filename', movies.downloadMovieImagePath) */
router.delete('/:id', movies.deleteMovie)
router.put('/edit/:id', movies.editMovie)

export default router