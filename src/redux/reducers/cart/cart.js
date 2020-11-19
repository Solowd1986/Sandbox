import addItemToCart from "./addItemToCart";

const initialState = {
    defaultSettings: {
        buttonsDisabled: false
    },
    amountOfProductsInCart: 0,
    minAmountOfProduct: 1,
    products: JSON.parse(localStorage.getItem("cart")) || []
};

export default (state = initialState, action) => {
    console.log('state', state);
    
    switch (action.type) {
        case "cart/addItemToCart" : {
            return addItemToCart(state, action.id, action.category);
        }

        case "cart/removeItemFromCart" : {
            console.log("del");
            break;
        }


        case "stop" : {
            return {
                ...state,
                defaultSettings: {
                    buttonsDisabled: true
                },
            }
        }



        default:
            return state;
    }
}

