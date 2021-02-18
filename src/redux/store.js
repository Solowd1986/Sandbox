import { applyMiddleware, createStore } from "redux";
import composeEnhancers from "./middlware/composeEnhancers";
import reducer from "./entities/rootReducer";
import reduxThunk from "redux-thunk";
import ApiService from "./api/ApiService/ApiService";

const activeMiddlewareList = [
    reduxThunk.withExtraArgument(ApiService),
];

const enhancedStore = composeEnhancers(applyMiddleware(...activeMiddlewareList));
const store = createStore(reducer, enhancedStore);

store.subscribe(() => {
    if (store.getState().cart.products) {
        localStorage.setItem("cart", encodeURIComponent(JSON.stringify(store.getState().cart.products)));
    }
});

export default store;


