import axios from "axios";

const signIn = async (login) => {
    try {
        let result = await axios.post(`/api/auth/signin`, login)
        return result
    }
    catch (err) {
        return err.response
    }
}

const signOut = async () => {
    try {
        let result = await axios.post(`/api/auth/signout`)
        return result
    }
    catch (err) {
        return await err.response
    }
}

export default {
    signIn, 
    signOut
}