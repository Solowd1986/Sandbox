import addItemToCart from "./addItemToCart";
import deleteItemFromCart from "./deleteItemFromCart";
import increaseProductsAmount from "./increaseProductsAmount";
import decreaseeProductsAmount from "./decreaseeProductsAmount";
import changeAmountOfProduct from "./changeAmountOfProduct";

const initialState = {
    defaultSettings: {
        buttonsDisabled: false
    },
    amountOfProductsInCart: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).length : 0,
    minAmountOfProduct: 1,
    products: JSON.parse(localStorage.getItem("cart")) || [

        // {
        //
        //     id: 1,
        //     title: "Oneplus 6T 6GB + 128GB",
        //     color: "черный оникс",
        //     price: 44500,
        //     rest: 12,
        //     quantity: 1,
        //
        //
        //     type: "смартфон",
        //     caseType: "классический",
        //     caseMaterial: "алюминиевый сплав, стекло",
        //     simType: "nano SIM",
        //     simCount: 2,
        //     weight: "180 г",
        //     size: "160.2x72.9x8.0 мм",
        //     screenType: "Fluid AMOLED, сенсорный",
        //     screenSize: "6.55 дюйм",
        //     screenResolution: "1650 x 720",
        //     screenRotate: "есть",
        //     gorillaGlass: "есть",
        //     mainCamera: "тройная 2/16/48 МП",
        //     flashType: "тыльная, светодиодная",
        //     mainCameraFunction: "автофокус, оптическая стабилизация",
        //     recordingVideo: "есть (MP4)",
        //     maximumFramerate: "30 кадров/с",
        //     audioSupport: "MP3, AAC, AAC+, WMA, AMR-NB, AMR-WB, WAV, FLAC, APE, OGG, MID, M4A, IMY, AC3, EAC3, EAC3-JOC, AC4",
        //     connectionStandart: "GSM 850/900/1800/1900, 3G, 4G LTE, 5G",
        //     interfaces: "Wi-Fi 802.11ac Dual Band, Bluetooth 5.1, USB 3.1, NFC",
        //     satellite: "GPS, ГЛОНАСС, BeiDou, Galileo, A-GPS",
        //     cpu: "Qualcomm Snapdragon 865 (Octa-core, 7nm, up to 2.84 GHz)",
        //     cpuCoresAmount: "8",
        //     videoCpu: "Adreno 650",
        //     memory: "128 Гб",
        //     ram: "6 Гб",
        //     acc: "2800 мА⋅ч",
        //     accType: "Li-Polymer",
        //     connectorType: "USB Type-C",
        //     flashLight: "есть",
        //     supplies: "смартфон, защитная пленка, чехол, кабель Type-C, зарядное устройство Warp Charge 30, шпилька для извлечения SIM",
        //     announceDate: "2016-04-14",
        //
        //
        //     imgPath: "oneplus_7pro_6gb_128gb_grey/oneplus_7pro_6gb_128gb_grey_275_1.png",
        //     imgAlt: "promo-phone-image",
        //     discount: true,
        // },


    ]
};

export default (state = initialState, action) => {
    //console.log('state', state);
    
    switch (action.type) {
        case "cart/addItemToCart" : {
            return addItemToCart(state, action.evt, action.id, action.category);
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

