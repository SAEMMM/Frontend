import axios from "axios";

const boardApi = axios.create({
    baseURL: "http://localhost:4000"
})

export const getBoard = async () => {
    const response = await boardApi.get('/board')
    return response.data
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
    return await boardApi.delete(`/board/${id}`, id)
}

export default boardApi