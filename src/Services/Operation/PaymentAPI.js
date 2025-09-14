import axios from "axios";
import { paymentEndpoints } from "../APIS";
import { setPaymentData } from "../../Redux/slices/paymentSlice";
import toast from "react-hot-toast";

const {
    PAYMENT_API,
    VERIFY_PAYMENT_API,
} = paymentEndpoints;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            // reject(new Error(`Script load failed for the script ${src}`))
            resolve(false);
        }
        document.body.appendChild(script)
    })
}

export async function handlePaymentAPI(data, token, navigate, dispatch) {
    try {
        const script = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!script) {
            console.error("Razorpay Script Load Failed");
            toast.error("Payment Failed");
            return;
        }
        const serverResponse = await axios.post(PAYMENT_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const options = {
            key: serverResponse?.data?.key,
            amount: `${data.amount}`,
            currency: "INR",
            name: "RentMate",
            description: "The Ultimate Rental Solution",
            image: "https://res.cloudinary.com/dhu8fpog1/image/upload/v1745856844/rentmate_logo_1_ntvx7m.png",
            order_id: serverResponse?.data?.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            prefill: {
                name: `${data.name}`,
                email: data.email,
            },
            handler: function (response) {
                // send payment success mail
                // sendPaymentSuccess(response, buyCourseData.data.data.amount, token)
                // verify payment
                verifyPayment({
                    ...response,
                    ...data,
                    ...serverResponse.data
                }, token, navigate, dispatch);
            },
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })


    } catch (error) {
        console.error("Error in handlePaymentAPI: ", error);
        throw error;
    }
}

async function verifyPayment(response, token, navigate, dispatch) {

    const toastId = toast.loading("Verifying payment...");
    try {
        const responseServer = await axios.post(VERIFY_PAYMENT_API, response, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.dismiss(toastId);
        if (responseServer.status === 200) {
            dispatch(setPaymentData(responseServer.data));
            navigate("/payment-success");
        }
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Payment verification failed");
        console.error("Error in verifyPayment: ", error);
    } finally {
        toast.dismiss(toastId);
    }
}