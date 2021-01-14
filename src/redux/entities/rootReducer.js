import { combineReducers } from "redux";
import cart from "./cart/reducer";
import lazyload from "./lazyload/reducer"
// import db from "./db/db"

// экспортируем результат работы функции combineReducers
export default combineReducers({
    cart,
    lazyload,
    // db,
});


