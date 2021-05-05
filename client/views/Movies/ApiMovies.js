import axios from "axios";

const getAll = async () => {
    try {
        let result = await axios.get(`/api/movies`);
        return await result.data
    }
    catch (err) {
        return await err.message
    }
}

const create = async (movie) => {
    try {
        let result = await axios.post(`/api/movies`, movie);
        return result
        
    }
    catch (err) {
        return err.message
    }
}

const edit = async (movie) => {
    try {
        let result = await axios.put(`/api/movies/${movie.movie_id}`, movie)
        return result
    }
    catch (err) {
        return err.message
    }
}

const destroy = async (movie) => {
    console.log(movie)
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
    create,
    edit,
    destroy
}