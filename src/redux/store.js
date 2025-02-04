import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/userSlice";
import adminReducer from "./feature/adminSlice";
import dateSlice from "./feature/dateSlice";
import appSlice from "./feature/appSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        date: dateSlice,
        app: appSlice
    },
});