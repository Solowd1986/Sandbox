
import {combineReducers} from "redux";
import cart from "./cart/cart";
import db from "./db/db"
import lazyload from "./lazyload/lazyload"

// экспортируем результат работы функции combineReducers
export default combineReducers({
    cart,
    db,
    lazyload
});











