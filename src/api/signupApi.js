import axios from "axios";

const signupApi = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export default signupApi

// export const accessClient = axios.create({
//     baseURL: API_END_POINT,
//     timeout: 180000,
//     withCredentials: false,
//     headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
//     }
//     });

// axios.post('api',{name: name},{headers: {Authorization: token,},})

// axios.get('api',
// {
// params: {name: name},
// headers: {Authorization: token,},
// }
// )