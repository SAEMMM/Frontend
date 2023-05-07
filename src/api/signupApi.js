import axios from "axios";

const signupApi = axios.create({
    baseURL: "http://localhost:4001"
})

export const getUser = async () => {
    const response = await signupApi.get('/users')
    return response.data
}

export const addUser = async (user) => {
    return await signupApi.post('/users', user)
}

export const userCheck = async (userId) => {
    return await signupApi.post('/idCheck', userId)
}

export default signupApi