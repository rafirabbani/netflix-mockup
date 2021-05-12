import axios from "axios";

const getAll = async () => {
    try {
        let result = await axios.get(`/api/casts`);
        return await result.data
    }
    catch (err) {
        return await err.message
    }
}

const create = async (cast) => {
    try {
        let result = await axios.post(`/api/casts`, cast);
        return result
        
    }
    catch (err) {
        return err.respinse
    }
}

const edit = async (cast) => {
    try {
        let result = await axios.put(`/api/casts/${cast.cast_id}`, cast)
        return result
    }
    catch (err) {
        return err.response
    }
}

const destroy = async (cast) => {
    try {
        let result = await axios.delete(`/api/casts/${cast}`)
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