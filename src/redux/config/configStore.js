import { configureStore } from "@reduxjs/toolkit";
import isLogin from "../modules/isLogin";
import search from "../modules/searchValue";

const store = configureStore({
    reducer: {
        isLogin, search
    }
})

export default store;