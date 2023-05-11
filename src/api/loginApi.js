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
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("nickname", nickname);
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
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("nickname");
        return;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response.status === 401) {
            try {
                const response = await logout.get("/api/user/login", {
                    headers: {
                        "Authorization": accessToken,
                        "RefreshToken": refreshToken,
                    }
                });
                const newAccessToken = response.headers.authorization;
                const newRefreshToken = response.headers.refreshtoken;
                sessionStorage.setItem("accessToken", newAccessToken)
                sessionStorage.setItem("refreshToken", newRefreshToken)
                await logout([newAccessToken, newRefreshToken]);
            } catch (error) {
                sessionStorage.removeItem("refreshToken");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("nickname");
                sessionStorage.removeItem("isLogin");
            }
        }
    }
}

export default loginApi;