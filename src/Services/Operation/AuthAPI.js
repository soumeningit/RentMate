import axios from "axios";
import { authEndpoints } from "../APIS";
import { setToken, setUser } from "../../Redux/slices/authSlice";
import { setUserData } from "../../Redux/slices/profileSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    LOGOUT_API,
    FORGET_PASSWORD_API,
    UPDATE_PASSWORD_API,
    VERIFY_USER_API,
} = authEndpoints;

export const sendOTPAPI = async (data) => {
    try {
        const response = axios.post(SENDOTP_API, data);
        return response;
    } catch (error) {
        console.log("Error in sendOTPAPI: ", error);
    }
}

export const signUpAPI = async (data) => {
    try {
        const response = await axios.post(SIGNUP_API, data);
        return response;
    } catch (error) {
        console.log("Error in signUpAPI: ", error);
    }
}

export const loginAPI = async (data, dispatch) => {
    try {
        const response = await axios.post(LOGIN_API, data, { withCredentials: true });
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        dispatch(setUserData(response.data.user));
        return response;
    } catch (error) {
        console.log("Error in loginAPI: ", error);
    }
}

export const logoutAPI = async () => {
    try {
        const response = await axios.get(LOGOUT_API, { withCredentials: true });
        return response;
    } catch (error) {
        console.log("Error in logoutAPI: ", error);
    }
}

export const forgetPasswordAPI = async (data) => {
    try {
        const response = await axios.post(FORGET_PASSWORD_API, data);
        return response;
    } catch (error) {
        console.log("Error in forgetPasswordAPI: ", error);
    }
}

export const updatePasswordAPI = async (data) => {
    try {
        const response = await axios.post(UPDATE_PASSWORD_API, data);
        return response;
    } catch (error) {
        console.log("Error in updatePasswordAPI: ", error);
    }
}

export const verifyUserAPI = async (data) => {
    try {
        const response = await axios.post(VERIFY_USER_API, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.error("Error in verifyUserAPI: ", error);
        throw error; // optional: rethrow for error handling in component
    }
};
