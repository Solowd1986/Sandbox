export default function addItemToCart(state, evt, item) {

    const products = [...state.products];
    const product = { ...item, quantity: 1 };
    if (!products.includes(item)) {
        products.push(product);
    }

    return {
        ...state,
        amountOfProductsInCart: state.amountOfProductsInCart + 1,
        products,
    };
}


