import {configureStore} from "@reduxjs/toolkit";
import {springApi} from "./api/spring.api";
import {setupListeners} from "@reduxjs/toolkit/query";
import {cartReducer} from "./slices/cart.slice";
import {ordersHistoryReducer} from "./slices/ordersHistory.slice";

export const store = configureStore({
    reducer: {
        [springApi.reducerPath]: springApi.reducer,
        cartStore: cartReducer,
        ordersHistoryStore: ordersHistoryReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(springApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
