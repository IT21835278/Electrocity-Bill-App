import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/feartures/auth/authSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer
    }
})