import * as types from "./constants/cart";

export const addItemToCart = (evt, item) => {
    return {
        type: types.CART_ADD_ITEM,
        payload: {
            evt,
            item
        }
    }
};

export const removeItemFromCart = (evt, id) => {
    return {
        type: types.CART_REMOVE_ITEM,
        payload: {
            evt,
            id
        }
    }
};

export const changeAmountOfProduct = (evt, id, quantity) => {
    return {
        type: types.CART_CHANGE_PRODUCT_AMOUNT,
        payload: {
            evt,
            id,
            quantity
        }
    }
};





















