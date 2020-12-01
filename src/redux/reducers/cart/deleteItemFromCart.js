export default function deleteItemFromCart(state, evt, id) {
    //console.log(id);
    //console.log(category);
    //console.log(state);

    let products = [...state.products];
    evt.target.classList.remove(evt.target.dataset.disabled);

    if (products.find(item => item.id === id)) {

        const currentProductIndex = products.indexOf(products.find(item => item.id === id));
        products.splice(currentProductIndex, 1);
        localStorage.setItem("cart", JSON.stringify(products));

        return {
            ...state,
            defaultSettings: {
                buttonsDisabled: false
            },
            amountOfProductsInCart: state.amountOfProductsInCart - 1,
            products
        };
    }

    return {
        ...state,
        defaultSettings: {
            buttonsDisabled: false
        },
    };
}





