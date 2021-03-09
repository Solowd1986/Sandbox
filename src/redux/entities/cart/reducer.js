import * as types from "./constants/cart";
import { List } from "immutable";

const initialState = {
    amountOfProductsInCart: 0,
    minAmountOfProduct: 1,
    modalCartShowedToUserCount: 0,
    shippingPrice: 400,
    products: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CART_ADD_ITEM: {
            const { item } = action.payload;

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

        case types.CART_REMOVE_ITEM : {
            const { item } = action.payload;
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


        case types.CART_CHANGE_PRODUCT_AMOUNT : {
            const { evt, id, quantity } = action.payload;

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

        case types.CART_CHANGE_SHIPPING_PRICE : {
            const { price } = action.payload;
            if (isNaN(parseInt(price))) return state;
            return {
                ...state,
                shippingPrice: parseInt(price)
            };
        }

        default:
            return state;
    }
}










