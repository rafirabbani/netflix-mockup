import axios from "axios";

const signIn = async (login) => {
    try {
        let result = await axios.post(`/api/auth/signin`, login)
        return result
    }
    catch (err) {
        return await err.message
    }
}

const signOut = async () => {
    try {
        let result = await axios.post(`/api/auth/signout`)
        return result
    }
    catch (err) {
        return await err.message
    }
}

export default {
    signIn, 
    signOut
}