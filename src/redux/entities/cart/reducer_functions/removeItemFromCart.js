export default function removeItemFromCart(state, evt, id) {
    const index = state.products.findIndex(product => product.id === id);
    const products = [
        ...state.products.slice(0, index),
        ...state.products.slice(index + 1)
    ];

    return {
        ...state,
        amountOfProductsInCart: state.amountOfProductsInCart - 1,
        products
    };
}





