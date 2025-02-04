import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,    
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        saveLoadingState: (state, action) => {
            (state.isLoading = action.payload);
        }
    },
});

export const { saveLoadingState } = appSlice.actions;

export default appSlice.reducer;