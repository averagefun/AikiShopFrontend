import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {cartActions} from "../store/slices/cart.slice";
import {ordersHistoryActions} from "src/store/slices/ordersHistory.slice";

const actions = {
    ...cartActions,
    ...ordersHistoryActions
};

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}
