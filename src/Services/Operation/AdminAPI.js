import axios from "axios";
import { adminEndPoints } from "../APIS";

const {
    GET_ALL_USERS_API,
    DELETE_USER_API,
    GET_ALL_PENDING_USERS_API,
    VERIFY_PENDING_USERS_API,
    BLOCK_USER_API
} = adminEndPoints;

export const getAllUsersAPI = async (userId, token) => {
    try {
        const response = await axios.get(GET_ALL_USERS_API, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                userId: userId,
            },
        });
        return response;
    } catch (error) {
        console.log("Error in get user admin api : " + error);
    }
}

export const deleteUserAPI = async (userId, token) => {
    try {
        const response = await axios.delete(DELETE_USER_API, {
            params: {
                userId: userId,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.log("Error in delete user admin api : " + error);
    }
};

export const getAllPendingUsersAPI = async (token) => {
    try {
        const response = await axios.get(GET_ALL_PENDING_USERS_API, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    } catch (error) {
        console.log("Error in get all pending users admin api : " + error);
        throw error;
    }
}

export const verifyPendingUsersAPI = async (token, data) => {
    console.log("data in verify pending users api : ", data);
    try {
        const response = await axios.post(VERIFY_PENDING_USERS_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    } catch (error) {
        console.log("Error in verify pending users admin api : " + error);
        throw error;
    }
}

export const blockUserAPI = async (token, userId) => {
    console.log(token, userId);
    try {
        const response = await axios.post(BLOCK_USER_API, userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.log("Error in verify pending users admin api : " + error);
        throw error;
    }
}

