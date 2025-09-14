import axios from "axios";
import { chatEndpoints } from "../APIS";

const {
    GET_ALL_MESSAGES_API,
} = chatEndpoints;

export const getAllMessagesAPI = async (userId, token) => {
    try {
        const response = await axios.get(GET_ALL_MESSAGES_API, {
            params: {
                userId: userId
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
}