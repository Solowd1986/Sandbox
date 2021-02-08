export const addItemToCart = (evt, item) => {
    return {
        type: "cart/addItemToCart",
        payload: {
            evt,
            item
        }
    }
};


export const removeItemFromCart = (evt, id) => {
    return {
        type: "cart/removeItemFromCart",
        payload: {
            evt,
            id
        }
    }
};

export const changeAmountOfProduct = (evt, id, quantity) => {
    return {
        type: "cart/changeAmountOfProduct",
        payload: {
            evt,
            id,
            quantity
        }
    }
};





















