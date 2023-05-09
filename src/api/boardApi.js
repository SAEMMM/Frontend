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

export const addPost = async (formData) => {
    return await boardApi.post("/api/board", formData);
}

export const deleteBoard = async ({ id }) => {
    return await boardApi.delete(`/api/board/${id}`, id)
}

export default boardApi