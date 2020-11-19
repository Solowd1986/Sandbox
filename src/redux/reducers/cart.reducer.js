const Cookies = require("js-cookie");
//import db from "./database";
import axios from "axios";


// call method after passing them and processing
// export const getData = async dispatch => {
//     const responce = await axios.get("/");
//     dispatch(responce);
// };


// Default state of application
const initialState = {
    isModalCartShow: false,

    cartCounter: Cookies.getJSON("cart") ? Cookies.getJSON("cart").length : 0,

    addProducts: Cookies.getJSON("cart") || [],

    modal: false,
};



// Данный базовый reducer экспортируется по-умолчанию в storeInit
export default function (state = initialState, action) {

    switch (action.type) {
        case "cart/removeCartItem": {

            //return removeOrderItem(state, action.id, action.category);
            break;
        }


        case "cart/addItemToCart": {
            console.log(1211);

            return state;
            break;
        }


        //case "cart/addProductToCart"
        case "onProductAdd": {
            const id = action.id;
            let add = [...state.addProducts];
            let cartCounter = state.cartCounter;

            if (!state.addProducts.find(item => item.id === id)) {
                cartCounter++;
                add.push(
                    { ...state.promo[action.cat].find(item => item.id === id), quantity: 1, category: action.cat });
            }

            Cookies.set("cart", add);
            //console.log(Cookies.get("cart"));

            return {
                ...state,
                cartCounter: cartCounter,
                addProducts: add
            }
        }


        case "onModalShow": {

            break;
        }


        case "ORDER_ITEM_INC" : {
            //console.log(action.id);
            const min = 1;

            let obj = state.addProducts.find(item => item.id === action.id);

            // check for other caterory
            const max = state.promo[obj.category].find(item => item.id === action.id).rest;
            //console.log(max);


            let quantity = Math.max(min, Math.min(max, state.addProducts.find(item => item.id === action.id).quantity + 1));
            //console.log(quantity);


            obj.quantity = quantity;


            const addProd = [...state.addProducts];
            addProd[state.addProducts.indexOf(obj)] = obj;
            //console.log(addProducts);

            Cookies.set("cart", addProd);

            return {
                ...state,
                addProducts: addProd
            }
        }

        case "ORDER_ITEM_DEC" : {
            //console.log(action.id);
            const min = 1;

            let obj = state.addProducts.find(item => item.id === action.id);

            // check for other caterory

            const max = state.promo[obj.category].find(item => item.id === action.id).rest;
            //console.log(max);


            let quantity = Math.max(min, Math.min(max, state.addProducts.find(item => item.id === action.id).quantity - 1));
            //console.log(quantity);


            obj.quantity = quantity;

            const addProd = [...state.addProducts];
            addProd[state.addProducts.indexOf(obj)] = obj;
            //console.log(addProducts);

            Cookies.set("cart", addProd);

            return {
                ...state,
                addProducts: addProd
            }
        }


        case "ORDER_ITEM_DELETE": {
            //console.log(action.id);

            let addProd = [...state.addProducts];
            addProd.splice(state.addProducts.indexOf(addProd.find(item => item.id === action.id)), 1);


            addProd.length === 0 ? Cookies.remove("cart") : Cookies.set("cart", addProd);

            return {
                ...state,
                cartCounter: state.cartCounter - 1,
                addProducts: addProd
            }
        }

        default: {
            return state;
        }
    }
}