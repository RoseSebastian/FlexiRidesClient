import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/userSlice";
import adminReducer from "./feature/adminSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
    },
});