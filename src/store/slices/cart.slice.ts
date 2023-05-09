import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem, ICartItemChangeEvent, IProductSize} from "src/types/interfaces";

interface CartState {
    cart: ICartItem[];
}

const cartProducts = localStorage.getItem("cartProducts") != null ?
    JSON.parse(localStorage.getItem("cartProducts") as string) as ICartItem[] : []

const initialState: CartState = {
    cart: cartProducts
};

export const cartSlice = createSlice({
    name: "cartProducts",
    initialState: initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItemChangeEvent>) => {
            const foundItem: ICartItem | undefined = state.cart.find(product => product.productId === action.payload.productId);
            if (foundItem) {
                foundItem.sizes.push({
                    id: action.payload.sizeId,
                    article: action.payload.article,
                    size: action.payload.size,
                    count: 1
                });
            } else {
                state.cart.push({
                    productId: action.payload.productId,
                    sizes: [{
                        id: action.payload.sizeId,
                        article: action.payload.article,
                        size: action.payload.size,
                        count: 1
                    }]
                })
            }
            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        incrementSize: (state, action: PayloadAction<ICartItemChangeEvent>) => {
            const foundItem: ICartItem = state.cart.find(item => item.productId === action.payload.productId) as ICartItem;
            const foundSize: IProductSize = foundItem.sizes.find(size => size.size === action.payload.size) as IProductSize;
            foundSize.count++;
            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        decrementSize: (state, action: PayloadAction<ICartItemChangeEvent>) => {
            const foundItem: ICartItem = state.cart.find(item => item.productId === action.payload.productId) as ICartItem;
            const foundSize: IProductSize = foundItem.sizes.find(size => size.size === action.payload.size) as IProductSize;
            foundSize.count--;

            if (foundSize.count === 0) {
                foundItem.sizes = foundItem.sizes.filter(size => size.size !== action.payload.size);

                if (foundItem.sizes.length === 0) {
                    state.cart = state.cart.filter(item => item.productId !== action.payload.productId);
                }
            }
            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        deleteSize: (state, action: PayloadAction<ICartItemChangeEvent>) => {
            const foundItem: ICartItem = state.cart.find(item => item.productId === action.payload.productId) as ICartItem;
            const foundSize: IProductSize = foundItem.sizes.find(size => size.size === action.payload.size) as IProductSize;
            foundSize.count = 0;

            foundItem.sizes = foundItem.sizes.filter(size => size.size !== action.payload.size);
            if (foundItem.sizes.length === 0) {
                state.cart = state.cart.filter(item => item.productId !== action.payload.productId);
            }
            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        deleteCart: (state) => {
            state.cart = [];
            localStorage.removeItem("cartProducts");
        }
    }
})

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
