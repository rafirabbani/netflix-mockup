import axios from "axios";

const getAll = async () => {
    try {
        let result = await axios.get(`/api/users`);
        return await result.data
    }
    catch (err) {
        return await err.message
    }
}

const destroy = async (movie) => {
    try {
        let result = await axios.delete(`/api/movies/${movie}`)
        return result
    }
    catch (err) {
        return err.message
    }
}

export default {
    getAll,
    destroy
}