import { productEndpoints } from "../APIS";
import axios from "axios";

const {
    GET_ALL_CATEGORIES_API,
    CREATE_PRODUCT_API,
    GET_ALL_PRODUCTS_API,
    GET_ALL_SELL_PRODUCTS_API,
    GET_PRODUCT_DETAILS_API,
    GET_ALL_RENT_PRODUCTS_API,
    GET_SELL_PRODUCTS_API,
} = productEndpoints;

export const getAllCategoriesAPI = async (token) => {
    console.log("Token in getAllCategoriesAPI: ", token);
    console.log("GET_ALL_CATEGORIES_API: ", GET_ALL_CATEGORIES_API);

    try {
        const response = await axios.get(GET_ALL_CATEGORIES_API, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });

        return response;
    } catch (error) {
        console.log("Error in getAllCategoriesAPI: ", error);
    }
};


export const createProductAPI = async (data, token) => {
    try {
        const response = await axios.post(CREATE_PRODUCT_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllSellProductsAPI = async () => {
    try {
        const response = await axios.get(GET_ALL_SELL_PRODUCTS_API);
        return response;
    } catch (error) {
        console.log("Error in getAllSellProductsAPI: ", error);
    }
}

export const getProductDetailsAPI = async (id, usedFor) => {
    try {
        const response = await axios.get(GET_PRODUCT_DETAILS_API, {
            params: { id: id, usedFor: usedFor },
        });
        return response;
    } catch (error) {
        console.log("Error in getProductDetailsAPI: ", error);
    }
}

export const getAllRentProductsAPI = async () => {
    try {
        const response = await axios.get(GET_ALL_RENT_PRODUCTS_API);
        return response;
    } catch (error) {
        console.log("Error in getAllSellProductsAPI: ", error);
    }
}

export const getSellProductsAPI = async (userId, token) => {
    try {
        const response = await axios.get(GET_SELL_PRODUCTS_API, {
            params: { userId: userId },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    } catch (error) {
        console.log("Error in getSellProductsAPI: ", error);
    }
}