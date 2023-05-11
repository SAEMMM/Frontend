import axios from "axios";

const boardApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export const addPost = async ([formData, accessToken, refreshToken]) => {
    try {
        const config = {
            headers: {
                "Authorization": accessToken,
                "RefreshToken": refreshToken,
            }
        }
        return await boardApi.post("/api/board", formData, config)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response.status === 401) {
            try {
                const response = await boardApi.post("/api/board", formData, {
                    headers: {
                        "Authorization": accessToken,
                        "RefreshToken": refreshToken,
                    }
                })
                const newAccessToken = response.headers.authorization;
                const newRefreshToken = response.headers.refreshtoken;
                sessionStorage.setItem("accessToken", newAccessToken)
                sessionStorage.setItem("refreshToken", newRefreshToken)
                await boardApi.post("/api/board", formData, {
                    headers: {
                        "Authorization": newAccessToken,
                        "RefreshToken": newRefreshToken
                    }
                })
            } catch (error) {
                sessionStorage.removeItem("refreshToken");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("nickname");
                sessionStorage.removeItem("isLogin");
            }
        }
    }
}

export const deleteBoard = async ([id, accessToken, refreshToken]) => {
    try {
        const config = {
            headers: {
                "Authorization": accessToken,
                "RefreshToken": refreshToken
            }
        }
        return await boardApi.delete(`/api/boards/${id}`, config)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response.status === 401) {
            try {
                const response = await boardApi.delete(`/api/boards/${id}`, {
                    headers: {
                        "Authorization": accessToken,
                        "RefreshToken": refreshToken,
                    }
                })
                const newAccessToken = response.headers.authorization;
                const newRefreshToken = response.headers.refreshtoken;
                sessionStorage.setItem("accessToken", newAccessToken)
                sessionStorage.setItem("refreshToken", newRefreshToken)
                await boardApi.delete(`/api/boards/${id}`, {
                    headers: {
                        "Authorization": newAccessToken,
                        "RefreshToken": newRefreshToken
                    }
                })
            } catch (error) {
                sessionStorage.removeItem("refreshToken");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("nickname");
                sessionStorage.removeItem("isLogin");
            }
        } else if (axios.isAxiosError(error) && error.response.status === 400) { alert('삭제 권한이 없습니다')}
    }
}

export const updateBoard = async ([id, board, accessToken, refreshToken]) => {
    try {
        const config = {
            headers: {
                "Authorization": accessToken,
                "RefreshToken": refreshToken
            }
        }
        return await boardApi.put(`/api/boards/${id}`, board, config)
    } catch (error) {
        if (axios.isAxiosError(error) && error.response.status === 401) {
            try {
                const response = boardApi.put(`/api/boards/${id}`, board, {
                    headers: {
                        "Authorization": accessToken,
                        "RefreshToken": refreshToken,
                    }
                })
                const newAccessToken = response.headers.authorization;
                const newRefreshToken = response.headers.refreshtoken;
                sessionStorage.setItem("accessToken", newAccessToken)
                sessionStorage.setItem("refreshToken", newRefreshToken)
                await boardApi.put(`/api/boards/${id}`, board, {
                    headers: {
                        "Authorization": newAccessToken,
                        "RefreshToken": newRefreshToken
                    }
                })
            } catch (error) {
                sessionStorage.removeItem("refreshToken");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("nickname");
                sessionStorage.removeItem("isLogin");
            }
        }

    }
}

export const beforeUpdate = async ([id, accessToken, refreshToken]) => {
    try {
        const config = {
            headers: {
                "Authorization": accessToken,
                "RefreshToken": refreshToken
            }
        }
        const response = await boardApi.get(`/api/boards/${id}`, config)
        return response.data.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response.status === 401) {
            try {
                const response = boardApi.get(`/api/boards/${id}`, {
                    headers: {
                        "Authorization": accessToken,
                        "RefreshToken": refreshToken,
                    }
                })
                const newAccessToken = response.headers.authorization;
                const newRefreshToken = response.headers.refreshtoken;
                sessionStorage.setItem("accessToken", newAccessToken)
                sessionStorage.setItem("refreshToken", newRefreshToken)
                await boardApi.get(`/api/boards/${id}`, {
                    headers: {
                        "Authorization": newAccessToken,
                        "RefreshToken": newRefreshToken
                    }
                })
            } catch (error) {
                sessionStorage.removeItem("refreshToken");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("nickname");
                sessionStorage.removeItem("isLogin");
            }
        }
    }
}


export default boardApi