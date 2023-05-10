import { configureStore } from "@reduxjs/toolkit";
import isLogin from "../modules/isLogin";

const store = configureStore({
    reducer: {
        isLogin,
    }
})

export default store;