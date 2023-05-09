import axios from "axios";

const loginApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export const login = async (userData) => {
    try {
<<<<<<< HEAD
        const response = await loginApi.post("/api/user/login", { userId, password });
        const accessToken = response.data.Authorization;
        const refreshToken = response.data.RefreshToken;
        localStorage.setItem("refreshToken", refreshToken);
        document.cookie = `accessToken=${accessToken}`;
        return accessToken;
    } catch {
        
    }
}
=======
        const response = await loginApi.post("/api/user/login", userData);
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;
        localStorage.setItem("refreshToken", refreshToken);
        document.cookie = `accessToken=${accessToken}`;
        return accessToken;
    } catch (error) { 
        throw new Error('로그인에 실패하였습니다')
    }
}

>>>>>>> a1f2a5fb1bda04521abfcf34814c154ce1b86011
export default loginApi;