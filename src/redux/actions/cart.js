export const buyItemByOneClick = (evt, id, category) => {
    return {
        type: "cart/buyItemByOneClick",
        evt,
        id,
        category
    }
};


export const disableButton = (evt) => {
    return {
        type: "cart/disableButton",
        evt
    }
};

export const disableOverlay = () => {
    return {
        type: "cart/disableOverlay",
    }
};

export const toggleOverlay = () => {
    return {
        type: "cart/toggleOverlay",
    }
};


export const enableOverlay = () => {
    return {
        type: "cart/enableOverlay",
    }
};


export const addItem = (evt, id, category) => {
    return {
        type: "cart/addItemToCart",
        evt,
        id,
        category
    }
};

export const addItemAsync = (evt, id, category) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(addItem(evt, id, category))
        }, 1000)
    }
};


export const removeItem = (evt, id) => {
    return {
        type: "cart/removeItemFromCart",
        evt,
        id
    }
};

export const removeItemAsync = (evt, id) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(removeItem(evt, id))
        }, 1000)
    }
};


export const decreaseeProductsAmount = (evt, id) => {
    return {
        type: "cart/decreaseeProductsAmount",
        id,
        evt
    }
};


export const increaseProductsAmount = (evt, id) => {
    return {
        type: "cart/increaseProductsAmount",
        id,
        evt
    }
};


export const changeAmountOfProduct = (evt, id, quantity) => {
    return {
        type: "cart/changeAmountOfProduct",
        evt,
        id,
        quantity
    }
};


















