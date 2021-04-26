import { Router } from 'express';
import IndexController from '../controllers/IndexController'

const router = Router();
const upload = IndexController.UploadController
const casts = IndexController.CastsController
const movies = IndexController.MoviesController

//Upload single image to cast or movie
router.post('/:folder/:id', IndexController.AuthController.requireSignIn, upload.singleUpload, (req, res, next) => {
    if(req.params.folder === 'movies'){
        movies.singleMovieImage(req, res, next)
    }
    else if (req.params.folder === 'casts'){
        casts.singleCastImage(req, res, next)
    }
}) 

//Edit cast or movie
//router.put('/:folder/:id', upload.multiPartUpload, casts.editCast)

export default router