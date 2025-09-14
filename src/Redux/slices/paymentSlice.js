import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentData: null,
};

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaymentData(state, action) {
            state.paymentData = action.payload;
        },
        clearPaymentData(state) {
            state.paymentData = null;
        },
    },
});

export const { setPaymentData, clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;