import axios from "axios";

const signupApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export default signupApi