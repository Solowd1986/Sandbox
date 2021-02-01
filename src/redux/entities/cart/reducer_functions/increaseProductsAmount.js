export default function increaseProductsAmount(state, evt, id) {
    // console.log(id);
    // console.log(evt);
    // console.log(state);

    const products = [...state.products];
    const currentProduct = { ...products.find(item => item.id === id) };

    const min = state.minAmountOfProduct;
    const max = currentProduct.rest;

    currentProduct.quantity = Math.max(min, Math.min(max, currentProduct.quantity + 1));
    products[products.indexOf(products.find(item => item.id === id))] = currentProduct;

    return {
        ...state,
        products
    };
}


