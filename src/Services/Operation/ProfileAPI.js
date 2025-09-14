import axios from "axios";

import { profileEndpoints } from "../APIS";

const {
    GET_USER_DETAILS_API,
    UPDATE_USER_DETAILS_API,
    UPDATE_USER_PROFILE_PIC_API,
    GET_USER_IS_VERIFIED_API,
    GET_ALL_PRODUCTS_USER_API
} = profileEndpoints;

export const getUserDetailsAPI = async (userId, token) => {
    try {
        const response = await axios.get(GET_USER_DETAILS_API, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                userId: userId,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
};

export const updateUserProfilePicAPI = async (data, token) => {
    try {
        const response = await axios.post(UPDATE_USER_PROFILE_PIC_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        console.error("Error updating user details:", error);
        throw error;
    }
};

export const updateUserDetailsAPI = async (data, token) => {
    try {
        const response = await axios.post(UPDATE_USER_DETAILS_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error updating user details:", error);
        throw error;
    }
};

export const getUserIsVerifiedAPI = async (userId, token) => {
    try {
        const response = await axios.get(GET_USER_IS_VERIFIED_API, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                userId: userId,
            },
        });
        return response;
    } catch (error) {
        console.error("Error checking user verification:", error);
        throw error;
    }
}

// export const updatePasswordAPI = async(data, token) => {
//     try {

//     } catch (error) {
//         throw error;
//     }
// }


export const getAllProductsByUserAPI = async (userId, token) => {
    try {
        const response = await axios.get(GET_ALL_PRODUCTS_USER_API, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                userId: userId,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching all products by user:", error);
        throw error;
    }
}