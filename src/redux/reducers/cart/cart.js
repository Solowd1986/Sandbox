import addItemToCart from "./addItemToCart";

const initialState = {
    products: JSON.parse(localStorage.getItem("cart")) || null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "cart/addItemToCart" : {
            addItemToCart(state, action.id, action.category);
            break;
        }

        case "cart/removeItemFromCart" : {

            break;
        }

        default:
            return state;
    }
}

