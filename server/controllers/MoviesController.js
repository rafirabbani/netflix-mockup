import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

const pathDir = path.join(__dirname, '../uploads')

//Create new Movie
const createMovie = async (req, res) => {
    const dataField ={}
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const form = formidable({
        multiples: true,
        uploadDir: pathDir,
        keepExtensions: true
    });
    /* form.onPart = (part) => {
        console.log(part)
    } */

    form 
        .on('fileBegin', (keyName, file) => {
            //console.log('fileBegin', file)
            let folder = pathDir + `/movies/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {recursive: true})
            }
            file.path = path.join(folder + file.name)
        })
        .on('field', (keyName, value) => {
            dataField[keyName] = value
        })
        .on('file', (keyName, file) => {
            //console.log(dataField)
            const title = dataField.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
            //console.log(title)
            let folder = pathDir + `/movies/${title}/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, {recursive: true}/* (err) => {
                    if (err) throw err
                    console.log('dir made')
                    fs.rename(file.path, path.join(folder + file.name), (err) => {
                        if (err) throw err
                        console.log('file moved')
                    })
                } */)
            }
            fs.rename(file.path, path.join(folder + file.name), (err) => {
                if (err) throw err
                console.log('file moved')
            })
            file.path = path.join(folder + file.name)
        })
        .on('end', () => {
            console.log('File Uploaded Successfully')
            //return res.send('hi')
        });

    form.parse(req, async(err, fields, files) => {
        //console.log(fields)
        //console.log('parse',files)
        if (err) {
            res.sendStatus(400).json({
                message: err.message
            })
        }
        const data = new req.context.models.Movies(fields)
            if (Object.keys(files).length !== 0) {
            data.movie_image = files.movie_image.name
            data.movie_image_path = files.movie_image.path
            //console.log(data.dataValues)
        }
        try {
            const result = await req.context.models.Movies.create(data.dataValues)
            return res.send(result)
        }
        catch (err) {
            res.send(err.response)
        }
    })
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
    const title = req.body.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
    let folder = pathDir + `/movies/${title}/`
    fs.rmdir(folder, {recursive: true}, async (err) => {
        if (err) throw err
        console.log('image deleted')
        const result = await req.context.models.Movies.destroy({
            where: {movie_id: req.params.id}
        })
        return res.send('deleted ' + result + ' row')
    })
}

//Edit movie
const editMovie = async (req, res) => {
    const result = await req.context.models.Movies.findOne({
        where: {movie_id: req.params.id}
    });
    //let title = result.dataValues.movie_title
    const dataField = {}
    //dataField['movie_title'] = title
    //console.log(dataField)
    const form = formidable({
        multiples: true,
        uploadDir: pathDir,
        keepExtensions: true
    });
    /* form.onPart = (part) => {
        console.log(part)
    }*/
    form 
        .on('fileBegin', (keyName, file) => {
            if (file) {
                fs.unlinkSync(result.dataValues.movie_image_path)
                const title = result.dataValues.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                fs.rmdirSync(`${pathDir}/movies/${title}`);
                let folder = pathDir + `/movies/`
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, {recursive: true})
                }
                file.path = path.join(folder + file.name)
            }
        })
        .on('field', (keyName, value) => {
            dataField[keyName] = value
        })
        .on('file', (keyName, file) => {
            //console.log(dataField)
            if (dataField.movie_title === undefined) {
                const title = result.dataValues.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                let folder = pathDir + `/movies/${title}/`
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, {recursive: true})
                    }
                fs.rename(file.path, path.join(folder + file.name), (err) => {
                    if (err) throw err
                    console.log('file moved')
                })
                file.path = path.join(folder + file.name)
            }
            else {
                const title = dataField.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                let folder = pathDir + `/movies/${title}/`
                if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder, {recursive: true})
                    }
                fs.rename(file.path, path.join(folder + file.name), (err) => {
                    if (err) throw err
                    console.log('file moved')
                })
                file.path = path.join(folder + file.name)
            }
        })
        .on('end', () => {
            console.log('File Uploaded Successfully')
            //return res.send('hi')
        });

    form.parse(req, async(err, fields, files) => {
        //console.log(fields)
        //console.log('parse',files)
        if (err) {
            res.sendStatus(400).json({
                message: err.message
            })
        }
        const data = new req.context.models.Movies(fields);
        if (Object.keys(files).length !== 0) {
            data.movie_image = files.movie_image.name
            data.movie_image_path = files.movie_image.path
            //console.log(data)
        }
        else {
            const title = fields.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
            let folder = pathDir + `/movies/${title}/`
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder)
            }
            fs.rename(result.dataValues.movie_image_path, path.join(folder + result.dataValues.movie_image), (err) => {
                if (err) throw err
                console.log('file moved')
                const oldTitle = result.dataValues.movie_title.replace(/\s+/g, '').replace(/\W/g, '').trim()
                fs.rmdirSync(`${pathDir}/movies/${oldTitle}`)
            });
            let newMoviePath = path.join(folder + result.dataValues.movie_image)
            data.movie_image_path = newMoviePath
        }
        try {
            const update = await req.context.models.Movies.update({
                movie_tmdb: data.dataValues.movie_tmdb,
                movie_rating: data.dataValues.movie_rating,
                movie_view: data.dataValues.movie_view,
                movie_title: data.dataValues.movie_title,
                movie_episode: data.dataValues.movie_episode,
                movie_director: data.dataValues.movie_director,
                movie_casts: data.dataValues.movie_casts,
                movie_studio: data.dataValues.movie_studio,
                movie_status: data.dataValues.movie_status,
                movie_duration: data.dataValues.movie_duration,
                movie_release: data.dataValues.movie_release,
                movie_country: data.dataValues.movie_country,
                movie_genre: data.dataValues.movie_genre,
                movie_network: data.dataValues.movie_network,
                movie_trailer: data.dataValues.movie_trailer,
                movie_image: data.dataValues.movie_image,
                movie_image_path: data.dataValues.movie_image_path
            }, { returning: true, where: { movie_id: req.params.id}});
            return res.send(update)
        }
        catch (err) {
            res.send(err.response)
        }
    })

   /*  const { movie_tmdb, movie_rating, movie_view, movie_title, movie_episode, movie_director, movie_casts, movie_studio,
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
    return res.send(result) */
}

const downloadMovieImage = async (req, res) => {
    const result = await req.context.models.Movies.findOne({
        where: {movie_id: req.params.id}
    });
    const filePath = result.dataValues.movie_image_path
    res.download(filePath)
}

/* const downloadMovieImagePath = async (req, res) => {
    let title = req.params.title.replace(/\s+/g, '').replace(/\W/g, '').trim()
    const image = `${pathDir}/movies/${title}/${req.params.filename}`
    console.log(image)
    res.download(image)
} */

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
    singleMovieImage,
    downloadMovieImage,
    //downloadMovieImagePath
}