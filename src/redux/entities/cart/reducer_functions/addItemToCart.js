export default function addItemToCart(state, item) {
    const products = !state.products ? [] : [...state.products];
    if (!products.includes(item)) {
        const product = { ...item, quantity: 1 };
        products.push(product);
    }

    return {
        ...state,
        amountOfProductsInCart: state.amountOfProductsInCart + 1,
        products,
    };
}


