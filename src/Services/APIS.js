const BASE_URL =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_PROD_BACKEND_URL
        : import.meta.env.VITE_DEV_BACKEND_URL;

console.log('BASE_URL:', BASE_URL);
console.log('MODE:', import.meta.env.MODE);



export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/api/auth/send-otp",
    SIGNUP_API: BASE_URL + "/api/auth/register",
    LOGIN_API: BASE_URL + "/api/auth/login",
    LOGOUT_API: BASE_URL + "/api/auth/logout",
    FORGET_PASSWORD_API: BASE_URL + "/api/auth/forget-password",
    UPDATE_PASSWORD_API: BASE_URL + "/api/auth/update-password",
    VERIFY_USER_API: BASE_URL + "/api/auth/verify-user",
}


export const productEndpoints = {
    GET_ALL_CATEGORIES_API: BASE_URL + "/api/user/get-categories",
    CREATE_PRODUCT_API: BASE_URL + "/api/user/create-product",
    GET_ALL_PRODUCTS_API: BASE_URL + "/api/user/get-products",
    GET_ALL_SELL_PRODUCTS_API: BASE_URL + "/api/without/user/get-sell-products",
    GET_PRODUCT_DETAILS_API: BASE_URL + "/api/without/user/get-product-details",
    GET_ALL_RENT_PRODUCTS_API: BASE_URL + "/api/without/user/get-rent-products",
    GET_SELL_PRODUCTS_API: BASE_URL + "/api/user/get-all-sell-products",
}

export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/api/general/get-user-details",
    UPDATE_USER_DETAILS_API: BASE_URL + "/api/user/update-user-details",
    UPDATE_USER_PROFILE_PIC_API: BASE_URL + "/api/user/update-user-profile-picture",
    GET_USER_IS_VERIFIED_API: BASE_URL + "/api/general/check-user-verified",
    GET_ALL_PRODUCTS_USER_API: BASE_URL + "/api/user/get-product-details-for-particular-user",
};

export const userResponseEndpoints = {
    CONTACT_US_API: BASE_URL + "/api/general/contact-us",
};

export const bookingEndpoints = {
    BOOK_PRODUCT_API: BASE_URL + "/api/user/create-booking",
    GET_BOOKING_DETAILS_API: BASE_URL + "/api/user/get-booking-details",
    GET_ALL_BOOKINGS_API: BASE_URL + "/api/user/get-all-bookings",
    GET_ALL_USER_BOOKINGS_API: BASE_URL + "/api/without/user/get-all-user-bookings",
};

export const paymentEndpoints = {
    PAYMENT_API: BASE_URL + "/api/general/payment",
    VERIFY_PAYMENT_API: BASE_URL + "/api/general/verify-payment",
};

export const chatEndpoints = {
    GET_ALL_MESSAGES_API: BASE_URL + "/api/general/get-chat",
};

export const adminEndPoints = {
    GET_ALL_USERS_API: BASE_URL + "/api/admin/get-all-users",
    DELETE_USER_API: BASE_URL + "/api/admin/delete-user",
    GET_ALL_PENDING_USERS_API: BASE_URL + "/api/admin/get-all-verify-pending-users",
    VERIFY_PENDING_USERS_API: BASE_URL + "/api/admin/verify-users",
    BLOCK_USER_API: BASE_URL + "/api/admin/block-user",
}
