import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export const tokenRefresh = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await api.post("/api/user/login??", { refreshToken }); //수정필요
    const accessToken = response.headers.authorization;
    const newRefreshToken = response.headers.refreshtoken;
    localStorage.setItem("refreshToken", newRefreshToken);
    document.cookie = `accessToken=${accessToken}`;
    return accessToken;
  } catch (error) {
    console.error(error);
    window.location.href = "/login";
  }
};
