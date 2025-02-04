import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    noOfDays: 1,
    Dates: {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString()
    },
};

export const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        saveDate: (state, action) => {
            (state.noOfDays = action.payload.noOfDays), (state.Dates = action.payload.Dates);
        },
        clearDate: (state) => {
            (state.noOfDays = 1), (state.Dates = {});
        },
    },
});

export const { saveDate,clearDate } = dateSlice.actions;

export default dateSlice.reducer;