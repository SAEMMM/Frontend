import axios from "axios";

const loginApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export const login = async (userData) => {
    try {
        const response = await loginApi.post("/api/user/login", userData);
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
    } catch (error) { 
        throw new Error('로그인에 실패하였습니다')
    }
}

export const logout = async ([accessToken, refreshToken]) => {
    try {
        const config = {
            headers: {
                "Authorization": accessToken,
                "RefreshToken": refreshToken
            }
        } 
        await loginApi.get("/api/user/logout", config)
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        return;
    } catch (error) {
        throw new Error('로그아웃에 실패하였습니다')
    }
}

export default loginApi;