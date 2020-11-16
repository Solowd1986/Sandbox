
const Cookies = require("js-cookie");
import db from "./database";
import axios from "axios";

// Default state of application
const initialState = {
    isModalCartShow: false,

    cartCounter: Cookies.getJSON("cart") ? Cookies.getJSON("cart").length : 0,
    db,

    addProducts: Cookies.getJSON("cart") || [],

    modal: false,

    promo: {
        phones: [
            {
                id: 1,
                title: "Oneplus 6T 6GB + 128GB",
                color: "(черный оникс)",
                price: 44500,
                rest: 100,
                imgPath: "oneplus_6t_6gb_128gb_black/oneplus_6t_6gb_128gb_black_275_1.png",
                imgAlt: "promo-phone-image",
                discount: true
            },
            {
                id: 2,
                title: "Oneplus 6T 8GB + 128GB",
                color: "(синий ультрамарин)",
                price: 61000,
                rest: 60,
                imgPath: "oneplus_6t_8gb_128gb_purple/oneplus_6t_8gb_128gb_purple_275_1.png",
                imgAlt: "promo-phone-image",
                discount: false
            },
            {
                id: 3,
                title: "Oneplus 7 Pro 8GB + 256GB",
                color: "(дымчато красный)",
                price: 51000,
                rest: 34,
                imgPath: "oneplus_7_8gb_256gb_red/oneplus_7_8gb_256gb_red_275_1.png",
                imgAlt: "promo-phone-image",
                discount: true
            },
            {
                id: 4,
                title: "Oneplus 7 Pro 12GB + 256GB",
                color: "(зеркальный серый)",
                price: 76000,
                rest: 32,
                imgPath: "oneplus_7_12gb_256gb_grey/oneplus_7_12gb_256gb_grey_275_1.png",
                imgAlt: "promo-phone-image",
                discount: true
            },
        ],
        gadgets: [
            {
                id: 566,
                title: "Зубная электрощетка Soocas X3 Sonic Electric ToothBrush",
                price: 7900,
                rest: 32,
                imgPath: "electric_tooth_brush_380_1.png",
                imgAlt: "promo-gadgets-image",
                discount: false
            },
            {
                id: 766,
                title: "Робот-пылесос Roborock Sweep One",
                price: 17200,
                rest: 52,
                imgPath: "roborock_sweep_one_380_1.png",
                imgAlt: "promo-gadgets-image",
                discount: true
            },
            {
                id: 567,
                title: "Автомобильное зарядное устройство ZMI Car Charger AP821",
                price: 11500,
                rest: 78,
                imgPath: "digital_display_car_charger_380_1.png",
                imgAlt: "promo-gadgets-image",
                discount: false
            },
            {
                id: 311,
                title: "Зеркало для макияжа Amiro Lux High Color",
                price: 15000,
                rest: 7,
                imgPath: "amiro_lux_high_color_380_1.png",
                imgAlt: "promo-gadgets-image",
                discount: false
            },
        ],
        accessoires: [
            {
                id: 11,
                title: "Беспроводные наушники OnePlus Bullets Wireless",
                price: 12000,
                rest: 12,
                imgPath: "oneplus_bullets_wireless_380_1.png",
                imgAlt: "promo-accessoires-image",
                discount: false
            },
            {
                id: 21,
                title: "Адаптер OnePlus Dash Power",
                price: 6000,
                rest: 42,
                imgPath: "oneplus_dash_charger_380_1.png",
                imgAlt: "promo-accessoires-image",
                discount: false
            },
            {
                id: 34,
                title: "Автомобильное зарядное устройство OnePlus Warp Charge",
                price: 9800,
                rest: 17,
                imgPath: "oneplus_warp_charge_30_380_1.png",
                imgAlt: "promo-accessoires-image",
                discount: true
            },
            {
                id: 151,
                title: "Адаптер OnePlus Type-C - 3.5мм",
                price: 2000,
                rest: 52,
                imgPath: "oth_cable_oneplus_type_c_380_1.png",
                imgAlt: "promo-accessoires-image",
                discount: false
            }
        ]
    }
};


/*
import {combineReducers} from "redux";
import cartReducer from "./reducers/cart.reducer";

export default combineReducers({
    cartReducer,
});

// call method after passing them and processing
export const getData = async dispatch => {
    const responce = await axios.get("/");
    dispatch(responce);
};
*/


// Данный базовый reducer экспортируется по-умолчанию в storeInit
export default function (state = initialState, action) {
    switch (action.type) {
        //case "cart/addProductToCart"
        case "onProductAdd": {
            const id = action.id;
            let add = [...state.addProducts];
            let cartCounter = state.cartCounter;

            if (!state.addProducts.find(item => item.id === id)) {
                cartCounter++;
                add.push({ ...state.promo[action.cat].find(item => item.id === id), quantity: 1, category: action.cat });
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




