/* import formidable from 'formidable'
import fs from 'fs'
import path from 'path' */
//Create new Movie
const createMovie = async (req, res, next) => {
    const result = await req.context.models.Movies.create({
        movie_tmdb : req.body.movie_tmdb,
        movie_rating : req.body.movie_rating,
        movie_view : req.body.movie_view,
        movie_title : req.body.movie_title,
        movie_episode: req.body.movie_episode,
        movie_director : req.body.movie_director,
        movie_casts : req.body.movie_casts,
        movie_studio : req.body.movie_studio,
        movie_status : req.body.movie_status,
        movie_duration : req.body.movie_duration,
        movie_release : req.body.movie_release,
        movie_country: req.body.movie_country,
        movie_genre: req.body.movie_genre,
        movie_network: req.body.movie_network,
        movie_trailer: req.body.movie_trailer,
    })
    return res.send(result)
}

//Update movie image
const singleMovieImage = async (req, res) => {
    const result = await req.context.models.Movies.update({
        movie_image: req.fileName
    }, {returning: true, where: {movie_id: req.params.id}})
    return res.send(result)
}

//Find all Movies
const findAllMovies = async (req, res) => {
    const result = await req.context.models.Movies.findAll({
        //attributes: {exclude: ['user_password','user_salt']}
    })
    return res.send(result)
}

//Find single movie by id
const findMovie = async (req, res) => {
    const result = await req.context.models.Movies.findOne({
        where: {movie_id: req.params.id}
    })
    return res.send(result)
}

//Find all movies and all comments
const findAllMoviesAndComments = async (req, res) => {
    const result = await req.context.models.Movies.findAll({
        include: [{
            model: req.context.models.Comments
        }]
    })
    return res.send(result)
}

//Find single movie with all the comments
const findMovieAndComments = async (req, res) => {
    const result = await req.context.models.Movies.findOne({
        where: {movie_id: req.params.id},
        include: [{
            model: req.context.models.Comments
        }]
    })
    return res.send(result)
} 

//Find all movies and all casts
const findAllMoviesAndCasts = async (req, res) => {
    const result = await req.context.models.Movies.findAll({
        include: [{
            model: req.context.models.Casts
        }]
    })
    return res.send(result)
}

//Find single movies with all the casts
const findMovieAndCasts = async (req, res) => {
    const result = await req.context.models.Movies.findOne({
        where: {movie_id: req.params.id},
        include: [{
            model: req.context.models.Casts
        }]
    })
    return res.send(result)
}

//Delete movie by id
const deleteMovie = async (req, res) => {
    const result = await req.context.models.Movies.destroy({
        where: {movie_id: req.params.id}
    })
    return res.send('deleted ' + result + 'row(s)')
}

//Edit movie
const editMovie = async (req, res) => {
    const { movie_tmdb, movie_rating, movie_view, movie_title, movie_episode, movie_director, movie_casts, movie_studio,
            movie_status, movie_duration, movie_release, movie_country, movie_genre, movie_network, movie_trailer} = req.body
        
    const result = await req.context.models.Movies.update({
        movie_tmdb: movie_tmdb,
        movie_rating: movie_rating,
        movie_view: movie_view,
        movie_title: movie_title,
        movie_episode: movie_episode,
        movie_director: movie_director,
        movie_casts: movie_casts,
        movie_studio: movie_studio,
        movie_status: movie_status,
        movie_duration: movie_duration,
        movie_release: movie_release,
        movie_country: movie_country,
        movie_genre: movie_genre,
        movie_network: movie_network,
        movie_trailer: movie_trailer
    }, {returning: true, where: {movie_id: req.params.id}})
    return res.send(result)
}

export default {
    createMovie,
    findAllMovies,
    findMovie,
    findAllMoviesAndComments,
    findMovieAndComments,
    findAllMoviesAndCasts,
    findMovieAndCasts,
    deleteMovie,
    editMovie,
    singleMovieImage
}