import axios from "axios";

const boardApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export const getSpring = async () => {
    const response = await boardApi.get(`/api/boards?season=spring`)
    return response.data.data
}

export const getSummer = async () => {
    const response = await boardApi.get(`/api/boards?season=summer`)
    return response.data.data
}

export const getFall = async () => {
    const response = await boardApi.get(`/api/boards?season=fall`)
    return response.data.data
}

export const getWinter = async () => {
    const response = await boardApi.get(`/api/boards?season=winter`)
    return response.data.data
}

export const addPost = async ([formData, accessToken, refreshToken]) => {
    const config = {
        headers: {
            "Authorization": accessToken,
            "RefreshToken": refreshToken,
        }
    }
    return await boardApi.post("/api/board", formData, config)
}

export const deleteBoard = async ([id, accessToken, refreshToken]) => {
    const config = {
        headers: {
            "Authorization": accessToken,
            "RefreshToken": refreshToken
        }
    } 
    console.log(config)
    return await boardApi.delete(`/api/boards/${id}`, config)
}

export default boardApi