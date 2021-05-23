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
        let result = await axios.post(`/api/casts/create/cast`, cast);
        return result
        
    }
    catch (err) {
        return err.respinse
    }
}

const edit = async (cast) => {
    //console.log(cast)
    const id = cast.get('cast_id')
    try {
        let result = await axios.put(`/api/casts/edit/${id}`, cast)
        return result
    }
    catch (err) {
        return err.response
    }
}

const destroy = async (cast_id, cast_name) => {
    try {
        let result = await axios.delete(`/api/casts/${cast_id}`, {
            data: {
                'cast_name': cast_name
            }
        })
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