

export const addItem = (evt, id, category) => {
    return {
        type: "cart/addItemToCart",
        evt,
        id,
        category
    }
};


export const removeItem = (evt, id) => {
    return {
        type: "cart/removeItemFromCart",
        evt,
        id
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





















