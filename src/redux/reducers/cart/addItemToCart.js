export default function addItemToCart(state, evt, id, category) {
    //console.log(id);
    //console.log(category);
    console.log(state);

    const products = [...state.products];

    // emulate request to database
    const currentProduct = category.productList.find(item => item.id === id);

    if (products.find(item => item.id === currentProduct.id)) {
        return {
            ...state,
            defaultSettings: {
                buttonsDisabled: false
            }
        };
    }

    products.push(currentProduct);

    return {
        ...state,
        defaultSettings: {
            buttonsDisabled: false
        },
        amountOfProductsInCart: state.amountOfProductsInCart + 1,
        products
    };
}


