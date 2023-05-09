import axios from "axios";

const loginApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export const login = async (userId, password) => {
    try {
        const response = await loginApi.post("/api/user/login", {userId, password});
        const accessToken = response.data.Authorization;
        const refreshToken = response.data.RefreshToken;
        localStorage.setItem("refreshToken", refreshToken);
        document.cookie = `accessToken=${accessToken}`;
        return accessToken;

export default loginApi;