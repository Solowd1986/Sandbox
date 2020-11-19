export default function addItemToCart(state, id, category) {
    //console.log(id);
    //console.log(category);
    //console.log(state);

    const products = [...state.products];

    //fetch("index.php").then(res => res.json()).then(res => console.log(res));
    const product = { name: "bob" };

    if (products.find(item => item.id === product.id)) return state;
    products.push(product);


    return {
        ...state,
        defaultSettings: {
            buttonsDisabled: false
        },
        amountOfProductsInCart: state.amountOfProductsInCart + 1,
        products
    };
}


