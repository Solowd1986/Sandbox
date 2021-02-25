export default function removeItemFromCart(state, item) {
    const index = state.products.indexOf(state.products.find(product => product.id === item.id && product.title === item.title));
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





