//import { sequelize } from '../../config/config-db'
import AuthHelper from '../helpers/AuthHelper'

//Create new user
const createUser = async (req, res) => {
    const { user_name, user_email, user_password, user_type } = req.body
    const users = await req.context.models.Users.findOne({
        where: { user_email: user_email }
      })
    if (users) {
        return res.status('409').json({
            error: "Email already existed"
        })
    }
    const salt = AuthHelper.makeSalt();
    const hashPassword = AuthHelper.hashPassword(user_password, salt);
    const result = await req.context.models.Users.create({
        user_name : user_name,
        user_email : user_email,
        user_password : hashPassword,
        user_type : user_type,
        user_salt: salt
    })
    //console.log(res)
    return res.send(result)
} 

//Find all users
const findAllUsers = async (req, res) => {
    const result = await req.context.models.Users.findAll()
    return res.send(result)
}

//Find single user by id

const findUser = async (req, res) => {
    const result = await req.context.models.Users.findOne({
        where: {user_id: req.params.id}
    })
    return res.send(result)
}

//Find all users with all comments
const findAllUsersAndComments = async (req, res) => {
    const result = await req.context.models.Users.findAll({
        include: [{
            model: req.context.models.Comments
        }]
    })
    return res.send(result)
}

//Find single user with all the comments
const findUserAndComments = async (req, res) => {
    const result = await req.context.models.Users.findOne({
        where: {user_id: req.params.id},
        include: [{
            model: req.context.models.Comments
        }]
    })
    return res.send(result)
}

//Delete user by id
const deleteUser = async (req, res) => {
    const result = await req.context.models.Users.destroy({
        where: {user_id: req.params.id},
    })
    return res.send(result)
}

//Edit user
const editUser = async (req, res) => {
    const {user_name, user_email, user_password, user_type} = req.body
    const result = await req.context.models.Users.update(
        {   user_name: user_name,
            user_email: user_email,
            user_password: user_password,
            user_type: user_type
        }, {returning: true, where: {user_id: req.params.id}}
    )
    return res.send(result)
}

export default {
    createUser,
    findAllUsers,
    findUser,
    findAllUsersAndComments,
    findUserAndComments,
    deleteUser,
    editUser
}