import addItemToCart from "./reducer_functions/addItemToCart";
import removeItemFromCart from "./reducer_functions/removeItemFromCart";
import changeAmountOfProduct from "./reducer_functions/changeAmountOfProduct";
import * as types from "./constants/cart";
import { List } from "immutable";

const initialState = {
    amountOfProductsInCart: 0,
    minAmountOfProduct: 1,
    products: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CART_ADD_ITEM: {
            const { item } = action.payload;

            //state.products! ? new List([]) : state.products.push(item);
            // let products = [...state.products];
            // if (!state.products.includes(item)) {
            //     products = state.products.push(item);
            // }
            //
            //
            // console.log(products);
            //
            //
            // return {
            //     ...state,
            //     amountOfProductsInCart: state.amountOfProductsInCart + 1,
            //     products,
            // };

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










