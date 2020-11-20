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


export const disableAddButton = (evt) => {
    return {
        type: "cart/disableAddButton",
        evt
    }
};



export const removeItem = (id) => {
    return {
        type: "cart/removeItemFromCart",
        id
    }
};