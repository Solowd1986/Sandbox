export default function changeAmountOfProduct(state, evt, id, quantity) {
    //console.log(id);
    //console.log(state);
    
    if (isNaN(Math.abs(parseInt(quantity)))) return state;

    const products = [...state.products];
    const currentProduct = { ...products.find(item => item.id === id) };

    const min = state.minAmountOfProduct;
    const max = currentProduct.rest;

    currentProduct.quantity = Math.max(min, Math.min(max, quantity));
    products[products.indexOf(products.find(item => item.id === id))] = currentProduct;

    return {
        ...state,
        products
    };
}






