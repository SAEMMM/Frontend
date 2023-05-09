import axios from "axios";

const loginApi = axios.create({
    baseURL: "http://localhost:4000"
});

export const login = (userId, password) => {
    return loginApi.post("/user/login", {userId, password})
        .then((response) => {
            const accessToken = response.data.Authorization;
            const refreshToken = response.data.RefreshToken;
            localStorage.setItem("refreshToken", refreshToken);
            document.cookie = `accessToken=${accessToken}`; //토큰 값 저장위치 다시 확인z
            return accessToken;
        })
        .catch((error) => {
            console.error(error);
        });
};

export default loginApi;
