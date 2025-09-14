import axios from "axios";

import { bookingEndpoints } from "../APIS";

const {
    BOOK_PRODUCT_API,
} = bookingEndpoints;

export const createBooking = async (data, token) => {
    try {
        const response = await axios.post(BOOK_PRODUCT_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};