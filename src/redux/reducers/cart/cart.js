import addItemToCart from "./addItemToCart";
import buyItemByOneClick from "./buyItemByOneClick";
import deleteItemFromCart from "./deleteItemFromCart";
import increaseProductsAmount from "./increaseProductsAmount";
import decreaseeProductsAmount from "./decreaseeProductsAmount";
import changeAmountOfProduct from "./changeAmountOfProduct";

const initialState = {
    modals: {
        showCheckoutModal: false,
    },
    defaultSettings: {
        buttonsDisabled: false
    },
    amountOfProductsInCart: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).length : 0,
    minAmountOfProduct: 1,
    products: JSON.parse(localStorage.getItem("cart")) || []
};


export default (state = initialState, action) => {
    //console.log('state', state);

    switch (action.type) {
        case "cart/addItemToCart" : {
            return addItemToCart(state, action.evt, action.id, action.category);
        }

        case "cart/buyItemByOneClick" : {
            return buyItemByOneClick(state, action.evt, action.id, action.category);
        }


        case "cart/disableOverlay" : {
            return {
                ...state,
                modals: {
                    showCheckoutModal: false,
                },
            }
        }

        case "cart/enableOverlay" : {
            return {
                ...state,
                modals: {
                    showCheckoutModal: true,
                },
            }
        }

        case "cart/toggleOverlay" : {
            return {
                ...state,
                modals: {
                    showCheckoutModal: !state.modals.showCheckoutModal,
                },
            }
        }



        case "cart/removeItemFromCart" : {
            return deleteItemFromCart(state, action.evt, action.id);
        }

        case "cart/changeAmountOfProduct" : {
            return changeAmountOfProduct(state, action.evt, action.id, action.quantity);
        }

        case "cart/disableButton" : {
            action.evt.target.classList.add(action.evt.target.dataset.disabled);

            return {
                ...state,
                defaultSettings: {
                    buttonsDisabled: true
                },
            }
        }

        case "cart/decreaseeProductsAmount" : {
            return decreaseeProductsAmount(state, action.evt, action.id);
        }

        case "cart/increaseProductsAmount" : {
            return increaseProductsAmount(state, action.evt, action.id);
        }

        default:
            return state;
    }
}

