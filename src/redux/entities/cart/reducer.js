import addItemToCart from "./reducer_functions/addItemToCart";
import removeItemFromCart from "./reducer_functions/removeItemFromCart";
import changeAmountOfProduct from "./reducer_functions/changeAmountOfProduct";

const cart = JSON.parse(decodeURIComponent(localStorage.getItem("cart")));

const initialState = {
    amountOfProductsInCart: cart ? cart.length : 0,
    minAmountOfProduct: 1,
    products: cart || null,
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










