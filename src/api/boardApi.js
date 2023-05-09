import axios from "axios";

const boardApi = axios.create({
    baseURL: "http://13.124.170.137:8080/"
})

export const getBoard = async () => {
    const response = await boardApi.get('/board')
    return response.data
}

export const addPost = async (board) => {
    return await boardApi.post("/board", board);
}

export const deleteBoard = async ({ id }) => {
    return await boardApi.delete(`/board/${id}`, id)
}

export default boardApi