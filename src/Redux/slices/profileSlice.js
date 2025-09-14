import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload;
        }
    }
});

export const { setUserData } = profileSlice.actions;

export default profileSlice.reducer;
