import { userResponseEndpoints } from "../APIS";
import axios from "axios";

const {
    CONTACT_US_API,
} = userResponseEndpoints;

export const contactUsAPI = async (data, token) => {
    try {
        const response = await axios.post(CONTACT_US_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.log("Error in contactUs: ", error);
    }
};