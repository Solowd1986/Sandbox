export default function addItemToCart(state, evt, id, category) {
    //console.log(id);
    console.log(category);
    console.log(state);

    evt.target.classList.remove(evt.target.dataset.disabled);

    const products = [...state.products];

    // emulate request to database
    const currentProduct = category.productList.find(item => item.id === id);

    //add some fields
    currentProduct.quantity = 1;
    currentProduct.imgFullPath = `${category.imgPrefix}/${category.categoryAlias}/${currentProduct.imgPath}`;


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


