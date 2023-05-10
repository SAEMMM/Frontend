import axios from "axios";

const boardApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export const getBoard = async () => {
    const response = await boardApi.get('/api/boards?season=봄')
    return response.data.data
}

export const addPost = async ([formData, accessToken, refreshToken]) => {
    const config = {
        headers: {
            "Authorization": accessToken,
            "RefreshToken": refreshToken,
        }
    }

    return await boardApi.post("/api/board", formData, config);
}

export const deleteBoard = async ({ id }) => {
    return await boardApi.delete(`/api/board/${id}`, id)
}

export default boardApi