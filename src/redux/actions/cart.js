export const addItem = (id, category) => {
    return {
        type: "cart/addItemToCart",
        id,
        category
    }
};


export const removeItem = (id) => {
    return {
        type: "cart/removeItemFromCart",
        id
    }
};