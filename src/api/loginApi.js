import axios from "axios";

const loginApi = axios.create({
    baseURL: "http://localhost:4001"
})

export const login = async (userId, password) => {
    try {
        const response = await loginApi.post("/user/login", {userId, password});
        const accessToken = response.data.Authorization;
        const refreshToken = response.data.RefreshToken;
        localStorage.setItem("refreshToken", refreshToken);
        document.cookie = `accessToken=${accessToken}`;
        return accessToken;

    } catch (error) {
        console.error(error);
    }
}

export default loginApi