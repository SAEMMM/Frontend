import axios from "axios";

const boardApi = axios.create({
    baseURL: "http://13.124.170.137:8080/"
})

export const getBoard = async () => {
    const response = await boardApi.get('/api/board')
    return response.data
}

export const addPost = async (formData) => {
    return await boardApi.post("/api/board", formData);
}

export const deleteBoard = async ({ id }) => {
    return await boardApi.delete(`/api/board/${id}`, id)
}

export default boardApi