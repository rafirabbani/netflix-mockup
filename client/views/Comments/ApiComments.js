import axios from "axios";

const getAll = async () => {
    try {
        let result = await axios.get(`/api/comments`);
        return await result.data
    }
    catch (err) {
        return await err.response
    }
}

const create = async (comment) => {
    try {
        let result = await axios.post(`/api/comments`, comment);
        return result
        
    }
    catch (err) {
        return err.response
    }
}

const edit = async (comment) => {
    try {
        let result = await axios.put(`/api/comments/${comment.comment_id}`, cast)
        return result
    }
    catch (err) {
        return err.response
    }
}

const destroy = async (comment) => {
    try {
        let result = await axios.delete(`/api/comments/${comment}`)
        return result
    }
    catch (err) {
        return err.response
    }
}

export default {
    getAll,
    create,
    edit,
    destroy
}