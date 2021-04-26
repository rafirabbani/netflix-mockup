//Create new cast
const createCasts = async (req, res) => {
    const result = await req.context.models.Casts.create({
        cast_name : req.body.cast_name,
        cast_movie_id : req.body.cast_movie_id,
    })
    return res.send(result)
}

const singleCastImage = async (req, res) => {
    const result = await req.context.models.Casts.update({
        cast_name : req.body.cast_name,
        cast_image: req.fileName
    }, {returning: true, where:{cast_id: req.params.id}})
    return res.send(result)
}

//Find all casts
const findAllCasts = async (req, res) => {
    const result = await req.context.models.Casts.findAll()
    return res.send(result)
}

//Find single cast by id
const findCast = async (req, res) => {
    const result = await req.context.models.Casts.findOne({
        where: {cast_id: req.params.id}
    })
    return res.send(result)
}

//Find all casts on single movie
const findCastOnMovie = async (req, res) => {
    const result = await req.context.models.Casts.findAll({
        where: {cast_movie_id: req.params.id}
    })
    return res.send(result)
}

//Delete casts by id
const deleteCast = async (req, res) => {
    const result = await req.context.models.Casts.destroy({
        where: {user_id: req.params.id}
    })
    return res.send('deleted ' + result + ' row(s)')
}

//Edit cast
const editCast = async (req, res) => {
    const {cast_name} = req.body
    const result = await req.context.models.Casts.update({
        cast_name: cast_name,
        cast_image: req.fileName
    }, {returning: true, where:{cast_id: req.params.id}})
    return res.send(result)
}

export default {
    createCasts,
    findAllCasts,
    findCast,
    findCastOnMovie,
    deleteCast,
    editCast,
    singleCastImage
}