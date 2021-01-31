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
    switch (action.type) {
        case "cart/setServerData" : {
            return {
                ...state,
                categoryTitle: action.data.cat,
                indexOfLastAddedElement: action.data.lastIndex,
                serverStorageData: [...state.serverStorageData, ...action.data.arrayOfElements],
            }
        }

        default:
            return state;
    }
}










