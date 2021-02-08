import addItemToCart from "./reducer_functions/addItemToCart";
import removeItemFromCart from "./reducer_functions/removeItemFromCart";
import changeAmountOfProduct from "./reducer_functions/changeAmountOfProduct";

const initialState = {
    amountOfProductsInCart: 0,
    minAmountOfProduct: 1,
    products: [],

};

export default (state = initialState, action) => {
    switch (action.type) {
        case "cart/addItemToCart" : {
            const { evt, item } = action.payload;
            return addItemToCart(state, evt, item);
        }

        case "cart/removeItemFromCart" : {
            const { evt, id } = action.payload;
            return removeItemFromCart(state, evt, id);
        }

        case "cart/changeAmountOfProduct" : {
            const { evt, id, quantity } = action.payload;
            return changeAmountOfProduct(state, evt, id, quantity);
        }

        default:
            return state;
    }
}










