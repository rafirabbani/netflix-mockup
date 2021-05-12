import axios from "axios";

const getAll = async () => {
    try {
        let result = await axios.get(`/api/movies`);
        return await result.data
    }
    catch (err) {
        return await err.response
    }
}

const getOne = async (movie) => {
    try {
        let result = await axios.get (`/api/movies/${movie}`);
        return await result.data
    }
    catch (err) {
        return await err.response
    }
}

const getMoviesCasts = async () => {
    try {
        let result = await axios.get(`/api/movies/movies-casts`);
        return await result.data
    }
    catch (err) {
        return await err.response
    }
}

const create = async (movie) => {
    try {
        let result = await axios.post(`/api/movies`, movie);
        return result
        
    }
    catch (err) {
        return err.response
    }
}

const edit = async (movie) => {
    try {
        let result = await axios.put(`/api/movies/${movie.movie_id}`, movie)
        return result
    }
    catch (err) {
        return err.response
    }
}

const destroy = async (movie) => {
    try {
        let result = await axios.delete(`/api/movies/${movie}`)
        return result
    }
    catch (err) {
        return err.response
    }
}

export default {
    getAll,
    getMoviesCasts,
    getOne,
    create,
    edit,
    destroy
}