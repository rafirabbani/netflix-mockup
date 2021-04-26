//Create new comment
const createComment = async (req, res) => {
    const result = await req.context.models.Comments.create({
        comment_text : req.body.comment_text,
        comment_user_id : req.body.comment_user_id,
        comment_movie_id : req.body.comment_movie_id
    })
    return res.send(result)
}

//Find all comments
const findAllComments = async (req, res) => {
    const result = await req.context.models.Comments.findAll()
    return res.send(result)
}

//Find single comment by id
const findComment = async (req, res) => {
    const result = await req.context.models.Comments.findOne({
        where: {comment_id: req.params.id}
    })
    return res.send(result)
}

//Find all comments on single movie
const findCommentsOnMovie = async (req, res) => {
    const result = await req.context.models.Comments.findAll({
        where: {comment_movie_id: req.params.id}
    })
    return res.send(result)
}

//Find all comments of a user 
const findCommentsUser = async (req, res) => {
    const result = await req.context.models.Comments.findAll({
        where: {comment_user_id: req.params.id}
    })
    return res.send(result)
}

//Delete comment by id
const deleteComment = async (req, res) => {
    const result = await req.context.models.Comments.destroy({
        where: {comment_id: req.params.id}
    })
    return res.send('deleted ' + result + ' row(s)')
}

//Edit comment
const editComment = async (req, res) => {
    const {comment_text} = req.body
    const result = await req.context.models.Comments.update({
        comment_text: comment_text
    }, {returning: true, where:{comment_id: req.params.id}})
    return res.send(result)
}

export default {
    createComment,
    findAllComments,
    findComment,
    findCommentsOnMovie,
    findCommentsUser,
    deleteComment,
    editComment
}