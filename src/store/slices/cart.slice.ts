import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem, ProductSize} from "src/types/interfaces";

interface CartItemChangeEvent {
    productId: number;
    sizeId: number;
    article: string;
    size: string;
}

interface CartState {
    cart: CartItem[];
    promo?: string;
}

const cartProducts = localStorage.getItem("cartProducts") != null ?
    JSON.parse(localStorage.getItem("cartProducts") as string) as CartItem[] : []

const initialPromo = localStorage.getItem("promo") != null ?
    localStorage.getItem("promo") as string : undefined;

const initialState: CartState = {
    cart: cartProducts,
    promo: initialPromo
};

export const cartSlice = createSlice({
    name: "cartProducts",
    initialState: initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItemChangeEvent>) => {
            const foundItem: CartItem | undefined = state.cart.find(product => product.productId === action.payload.productId);
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
        incrementSize: (state, action: PayloadAction<CartItemChangeEvent>) => {
            const foundItem: CartItem = state.cart.find(item => item.productId === action.payload.productId) as CartItem;
            const foundSize: ProductSize = foundItem.sizes.find(size => size.size === action.payload.size) as ProductSize;
            foundSize.count++;
            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        decrementSize: (state, action: PayloadAction<CartItemChangeEvent>) => {
            const foundItem: CartItem = state.cart.find(item => item.productId === action.payload.productId) as CartItem;
            const foundSize: ProductSize = foundItem.sizes.find(size => size.size === action.payload.size) as ProductSize;
            foundSize.count--;

            if (foundSize.count === 0) {
                foundItem.sizes = foundItem.sizes.filter(size => size.size !== action.payload.size);

                if (foundItem.sizes.length === 0) {
                    state.cart = state.cart.filter(item => item.productId !== action.payload.productId);
                }
            }
            localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        },
        deleteSize: (state, action: PayloadAction<CartItemChangeEvent>) => {
            const foundItem: CartItem = state.cart.find(item => item.productId === action.payload.productId) as CartItem;
            const foundSize: ProductSize = foundItem.sizes.find(size => size.size === action.payload.size) as ProductSize;
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
        },
        setPromo: (state, action: PayloadAction<string>) => {
            state.promo = action.payload;
            localStorage.setItem("promo", state.promo);
        }
    }
})

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
