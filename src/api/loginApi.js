import axios from "axios";

const loginApi = axios.create({
    baseURL: "http://13.124.170.137:8080/"
});

export const login = (userData) => {
    return loginApi.post("/api/user/login", userData)
        .then((response) => {
            const accessToken = response.headers.accesstoken;
            const refreshToken = response.headers.refreshtoken;
            localStorage.setItem("refreshToken", refreshToken);
            axios.defaults.headers.common[`Authorization`] = `Bearer ${accessToken}`; //토큰 값 저장위치 다시 확인
            return accessToken;
        })
};

export default loginApi;