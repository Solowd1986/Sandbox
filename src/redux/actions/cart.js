
export const addItem = (id, category) => {
    return {
        type: "cart/addItemToCart",
        id,
        category
    }
};


export const addItemAsync = (id, category) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(addItem(id, category))
        }, 3000)
    }
};



export const removeItem = (id) => {
    return {
        type: "cart/removeItemFromCart",
        id
    }
};