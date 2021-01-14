export default function addItemToCart(state, evt, id, category) {
    //console.log(id);
    //console.log(category);
    //console.log(state);

    evt.target.classList.remove(evt.target.dataset.disabled);

    const products = [...state.products];
    // emulate request to database, prevent acceess via link
    const currentProduct = JSON.parse(JSON.stringify(category.productList.find(item => item.id === id)));

    //add some fields
    currentProduct.quantity = 1;
    //console.log(category.imgPrefix);

    currentProduct.imgFullPath = `${category.imgPrefix}/${currentProduct.imgPath.md}`;
    products.push(currentProduct);
    localStorage.setItem("cart", JSON.stringify(products));

    return {
        ...state,
        defaultSettings: {
            buttonsDisabled: false
        },
        amountOfProductsInCart: state.amountOfProductsInCart + 1,
        products,
    };
}


