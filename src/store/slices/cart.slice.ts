import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem, ICartItemChangeEvent, IProductSize} from "src/types/interfaces";

interface CartState {
    cart: ICartItem[];
}

const initialState: CartState = {
    cart: []
};

export const cartSlice = createSlice({
    name: "cartProducts",
    initialState: initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItemChangeEvent>) => {
            const foundItem: ICartItem | undefined = state.cart.find(product => product.productId === action.payload.id);
            if (foundItem) {
                foundItem.sizes.push({
                    size: action.payload.size,
                    count: 1
                });
            } else {
                state.cart.push({
                    productId: action.payload.id,
                    sizes: [{
                        size: action.payload.size,
                        count: 1
                    }]
                })
            }
        },
        incrementSize: (state, action: PayloadAction<ICartItemChangeEvent>) => {
            const foundItem: ICartItem = state.cart.find(item => item.productId === action.payload.id) as ICartItem;
            const foundSize: IProductSize = foundItem.sizes.find(size => size.size === action.payload.size) as IProductSize;
            foundSize.count++;
        },
        decrementSize: (state, action: PayloadAction<ICartItemChangeEvent>) => {
            const foundItem: ICartItem = state.cart.find(item => item.productId === action.payload.id) as ICartItem;
            const foundSize: IProductSize = foundItem.sizes.find(size => size.size === action.payload.size) as IProductSize;
            foundSize.count--;

            if (foundSize.count === 0) {
                foundItem.sizes = foundItem.sizes.filter(size => size.size !== action.payload.size);

                if (foundItem.sizes.length === 0) {
                    state.cart = state.cart.filter(item => item.productId !== action.payload.id);
                }
            }
        }
    }
})

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
