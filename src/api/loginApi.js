import axios from "axios";

const loginApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export const login = async (userData) => {
    // try {
    const response = await loginApi.post("/api/user/login", userData);
    const accessToken = response.headers.authorization;
    const refreshToken = response.headers.refreshtoken;
    const nickname = response.data.data.nickname;
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("nickname", nickname);
    return response
    // } catch (error) { 
    //     alert("아이디와 비밀번호를 확인해주세요")
    // }
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
        localStorage.removeItem("nickname");
        return;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response.status === 401) {
            try {
                const response = await loginApi.post("/api/user/login", {
                    headers: {
                        "Authorization": accessToken,
                        "RefreshToken": refreshToken,
                    }
                });
                const newAccessToken = response.headers.authorization;
                const newRefreshToken = response.headers.refreshToken;
                localStorage.setItem("accessToken", newAccessToken)
                localStorage.setItem("refreshToken", newRefreshToken)
                await logout([newAccessToken, newRefreshToken]);
            } catch (error) {
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("nickname");
            }
        }
    }
}

export default loginApi;