import axios from "axios";

const boardApi = axios.create({
    baseURL: "http://localhost:4001"
})

export const addPost = async (board) => {
    try {
        const response = await boardApi.post("/board", board);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default boardApi