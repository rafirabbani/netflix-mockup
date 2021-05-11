import axios from "axios";

const create = async (user) => {
    try {
        let result = await axios.post(`/api/users/signup`, user);
        return await result.data
    }
    catch (err) {
        return await err.message
    }
}

const getAll = async () => {
    try {
        let result = await axios.get(`/api/users`);
        return await result.data
    }
    catch (err) {
        return await err.message
    }
}

const destroy = async (user) => {
    try {
        let result = await axios.delete(`/api/users/${user}`)
        return result
    }
    catch (err) {
        return err.message
    }
}

export default {
    getAll,
    destroy,
    create
}