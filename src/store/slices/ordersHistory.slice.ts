import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrder} from "src/types/interfaces";

interface OrdersHistoryState {
    ordersHistory: IOrder[];
}

const ordersHistory = localStorage.getItem("ordersHistory") !== null ?
    JSON.parse(localStorage.getItem("ordersHistory") as string) as IOrder[] : [];
ordersHistory.forEach(order => {
    order.creationTime = new Date(order.creationTime);
})

const initialState: OrdersHistoryState = {
    ordersHistory: ordersHistory
};

export const ordersHistorySlice = createSlice({
    name: "ordersHistory",
    initialState: initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<IOrder>) => {
            if (!state.ordersHistory.find(order => order.id === action.payload.id)) {
                state.ordersHistory.push(action.payload);
                localStorage.setItem("ordersHistory", JSON.stringify(state.ordersHistory));
            }
        },
        removeOrder: (state, action: PayloadAction<IOrder>) => {
            state.ordersHistory = state.ordersHistory.filter(order => order.id !== action.payload.id);
            localStorage.setItem("ordersHistory", JSON.stringify(state.ordersHistory));
        },
    }
})

export const ordersHistoryActions = ordersHistorySlice.actions;
export const ordersHistoryReducer = ordersHistorySlice.reducer;
