import { createSlice } from "@reduxjs/toolkit";

// Utility function to get token from localStorage
const getTokenFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        return token ? JSON.parse(token) : null;
    }
    return null;
};

const getUserFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
    return null;
};

// Utility function to set token in localStorage
const setLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const initialState = {
    user: getUserFromLocalStorage(),
    token: getTokenFromLocalStorage(),
    otpData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setOtpData: (state, action) => {
            state.otpData = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            setLocalStorage("user", action.payload);
        },
        setToken: (state, action) => {
            state.token = action.payload;
            setLocalStorage("token", action.payload);
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        },
    }
});

export const {
    setOtpData,
    setUser,
    setToken,
    logOut,
} = authSlice.actions;

export default authSlice.reducer;
