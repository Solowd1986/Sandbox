import addItemToCart from "./reducer_functions/addItemToCart";
import removeItemFromCart from "./reducer_functions/removeItemFromCart";
import changeAmountOfProduct from "./reducer_functions/changeAmountOfProduct";
import * as types from "./constants/cart";

const cart = JSON.parse(decodeURIComponent(localStorage.getItem("cart")));

const initialState = {
    amountOfProductsInCart: cart ? cart.length : 0,
    minAmountOfProduct: 1,
    products: cart || null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CART_ADD_ITEM: {
            const { item } = action.payload;
            return addItemToCart(state, item);
        }

        case types.CART_REMOVE_ITEM : {
            const { item } = action.payload;
            return removeItemFromCart(state, item);
        }

        case types.CART_CHANGE_PRODUCT_AMOUNT : {
            const { evt, id, quantity } = action.payload;
            return changeAmountOfProduct(state, evt, id, quantity);
        }

        default:
            return state;
    }
}










