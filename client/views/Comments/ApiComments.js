import axios from "axios";

const getAll = async () => {
    try {
        let result = await axios.get(`/api/comments`);
        return await result.data
    }
    catch (err) {
        return await err.message
    }
}

const create = async (comment) => {
    try {
        let result = await axios.post(`/api/comments`, comment);
        return result
        
    }
    catch (err) {
        return err.message
    }
}

const edit = async (comment) => {
    try {
        let result = await axios.put(`/api/comments/${comment.comment_id}`, cast)
        return result
    }
    catch (err) {
        return err.message
    }
}

const destroy = async (comment) => {
    try {
        let result = await axios.delete(`/api/comments/${comment}`)
        return result
    }
    catch (err) {
        return err.message
    }
}

export default {
    getAll,
    create,
    edit,
    destroy
}