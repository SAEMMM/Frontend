import axios from "axios";

const boardApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

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
    return await boardApi.delete(`/api/boards/${id}`, config)
}

export const updateBoard = async ([board, accessToken, refreshToken]) => {
    const config = {
        headers: {
            "Authorization": accessToken,
            "RefreshToken": refreshToken
        }
    } 
    return await boardApi.patch(`/api/boards/${board.id}`, board, config)
}

export default boardApi