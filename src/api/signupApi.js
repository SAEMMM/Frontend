import axios from "axios";

const signupApi = axios.create({
    baseURL: "http://13.124.170.137:8080/"
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