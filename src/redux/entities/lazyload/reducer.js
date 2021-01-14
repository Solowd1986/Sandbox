import addItemToCart from "../cart/addItemToCart";

const initialState = {
    modalShow: false,
    numberOfRequestedElements: 4,
    serverStorageData: [],
    categoryTitle: "",
    indexOfLastAddedElement: 0
};


export default (state = initialState, action) => {
    switch (action.type) {
        case "lazyLoad/setServerData" : {
            return {
                ...state,
                categoryTitle: action.data.cat,
                indexOfLastAddedElement: action.data.lastIndex,
                serverStorageData: [...state.serverStorageData, ...action.data.arrayOfElements],
            }
        }

        case "lazyLoad/clearDataStorage" : {
            return {
                ...state,
                serverStorageData: [],
                categoryTitle: "",
                indexOfLastAddedElement: 0
            }
        }


        case "lazyLoad/disableOverlay" : {
            if (action.callback) {
                action.callback();
            }
            return {
                ...state,
                modalShow: false
            }
        }


        case "lazyLoad/enableOverlay" : {
            return {
                ...state,
                modalShow: true

            }
        }

        default:
            return state;
    }
}







