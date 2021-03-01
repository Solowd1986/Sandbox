import { applyMiddleware, createStore } from "redux";
import composeEnhancers from "./middlware/composeEnhancers";
import reducer from "./entities/rootReducer";
import reduxThunk from "redux-thunk";
import reduxLogger from "./middlware/reduxLogger";
import ApiService from "./api/ApiService/ApiService";

const activeMiddlewareList = [
    reduxThunk.withExtraArgument(ApiService)

];

const preloadedState = JSON.parse(decodeURIComponent(localStorage.getItem("cart")));
const enhancedStore = composeEnhancers(applyMiddleware(...activeMiddlewareList));
const store = preloadedState ? createStore(reducer, preloadedState, enhancedStore) : createStore(reducer, enhancedStore);

store.subscribe(() => {
    if (store.getState().cart.products.length) {
        localStorage.setItem("cart", encodeURIComponent(JSON.stringify({ cart: store.getState().cart })));
    }
});

export default store;


