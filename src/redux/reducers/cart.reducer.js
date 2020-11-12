import {useState} from "react";


const Cookies = require("js-cookie");


const initialState = {
    isModalCartShow: false,
    cartCounter: Cookies.getJSON("cart") ? Cookies.getJSON("cart").length : 0,
    cartStore: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 3 },
    ],

    //addProducts: [],
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
                imgPath: "main-page/phone-main-page/oneplus_6t_6gb_128gb_black_275_1.png",
                imgAlt: "promo-phone-image",
                discount: true
            },
            {
                id: 2,
                title: "Oneplus 6T 8GB + 128GB",
                color: "(синий ультрамарин)",
                price: 61000,
                rest: 60,
                imgPath: "main-page/phone-main-page/oneplus_6t_8gb_128gb_purple_275_1.png",
                imgAlt: "promo-phone-image",
                discount: false
            },
            {
                id: 3,
                title: "Oneplus 7 Pro 8GB + 256GB",
                color: "(дымчато красный)",
                price: 51000,
                rest: 34,
                imgPath: "main-page/phone-main-page/oneplus_7_8gb_256gb_red_275_1.png",
                imgAlt: "promo-phone-image",
                discount: true
            },
            {
                id: 4,
                title: "Oneplus 7 Pro 12GB + 256GB",
                color: "(зеркальный серый)",
                price: 76000,
                rest: 32,
                imgPath: "main-page/phone-main-page/oneplus_7_12gb_256gb_grey_275_1.png",
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
                imgPath: "main-page/gadgets-main-page/electric_tooth_brush_275_1.png",
                imgAlt: "promo-gadgets-image",
                discount: false
            },
            {
                id: 766,
                title: "Робот-пылесос Roborock Sweep One",
                price: 17200,
                rest: 52,
                imgPath: "main-page/gadgets-main-page/roborock_sweep_one_275_1.png",
                imgAlt: "promo-gadgets-image",
                discount: true
            },
            {
                id: 567,
                title: "Автомобильное зарядное устройство ZMI Car Charger AP821",
                price: 11500,
                rest: 78,
                imgPath: "main-page/gadgets-main-page/digital_display_car_charger_275_1.png",
                imgAlt: "promo-gadgets-image",
                discount: false
            },
            {
                id: 311,
                title: "Зеркало для макияжа Amiro Lux High Color",
                price: 15000,
                rest: 7,
                imgPath: "main-page/gadgets-main-page/amiro_lux_high_color_275_1.png",
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
                imgPath: "main-page/accessoires-main-page/oneplus_bullets_wireless_275_1.png",
                imgAlt: "promo-accessoires-image",
                discount: false
            },
            {
                id: 21,
                title: "Адаптер OnePlus Dash Power",
                price: 6000,
                rest: 42,
                imgPath: "main-page/accessoires-main-page/oneplus_dash_charger_275_1.png",
                imgAlt: "promo-accessoires-image",
                discount: false
            },
            {
                id: 34,
                title: "Автомобильное зарядное устройство OnePlus Warp Charge",
                price: 9800,
                rest: 17,
                imgPath: "main-page/accessoires-main-page/oneplus_warp_charge_30_275_1.png",
                imgAlt: "promo-accessoires-image",
                discount: true
            },
            {
                id: 151,
                title: "Адаптер OnePlus Type-C - 3.5мм",
                price: 2000,
                rest: 52,
                imgPath: "main-page/accessoires-main-page/oth_cable_oneplus_type_c_275_1.png",
                imgAlt: "promo-accessoires-image",
                discount: false
            }
        ]
    }
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "cart/addProductToCart": {
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


        case "cart/increaseProductAmount" : {
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

        case "cart/decreaseProductAmount" : {
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


        case "cart/orderItemDelete": {
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








