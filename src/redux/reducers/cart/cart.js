import addItemToCart from "./addItemToCart";
import buyItemByOneClick from "./buyItemByOneClick";
import deleteItemFromCart from "./deleteItemFromCart";
import increaseProductsAmount from "./increaseProductsAmount";
import decreaseeProductsAmount from "./decreaseeProductsAmount";
import changeAmountOfProduct from "./changeAmountOfProduct";


/**
 * Благодаря подписке на store, из-за чего при любом изменении state записывается в localStorage, нам не нужны никакие
 * данные, кроме инициирующих, то есть то, что работает при первом запуске приложения. Например, пользователь, заказал
 * продукт, это отразилось в state, и тут же записалось в localStorage, далее прочие действия и перезагрузка страницы.
 * Вследствие чего initialState сбрасывается до изначальных значений, и данные теряются в данном контексте.
 *
 * Но, в этом случае при новом выполнении скрипта идет проверка наличия данных в locaStorage и если они там есть,
 * то весь state принимает тот вид, каким он был на момент последних меняющих его действий пользователя, такой вот бэкап
 */
const initialState = {
    modals: {
        orderSubmitModalShow: false,
        isdelayModalProcessCompleted: false,
        showModal: false,
        isOfferGoToCartBeenShown: false,
    },
    defaultSettings: {
        buttonsDisabled: false
    },
    amountOfProductsInCart: 0,
    minAmountOfProduct: 1,
    products: [],
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


        case "cart/enableOverlay" : {
            return {
                ...state,
                modals: {
                    ...state.modals,
                    isdelayModalProcessCompleted: false,
                    showModal: true,
                },
            }
        }

        case "cart/toggleOfferGoToCartBeenShown" : {
            return {
                ...state,
                modals: {
                    ...state.modals,
                    showModal: false,
                    isOfferGoToCartBeenShown: true,
                },
            }
        }

        case "cart/disableOverlay" : {
            return {
                ...state,
                modals: {
                    ...state.modals,
                    isdelayModalProcessCompleted: false,
                    showModal: false,
                },
            }
        }


        case "cart/delayOrder" : {
            return {
                ...state,
                modals: {
                    ...state.modals,
                    isdelayModalProcessCompleted: true,
                    showModal: true,
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

