import axios from "axios";

const boardApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export const getBoard = async () => {
    const response = await boardApi.get('/api/boards?season=봄')
    return response.data.data
}

export const addPost = async (board) => {
    try {
        const response = await boardApi.post("/board", board);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteBoard = async ({ id }) => {
    return await boardApi.delete(`/boards/${id}`, id)
}

export default boardApi