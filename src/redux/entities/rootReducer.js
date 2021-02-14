import { combineReducers } from "redux";
import cart from "./cart/reducer";
import modal from "./modal/reducer";
import db from "./db/reducer";
import sort from "./sort/reducer"
import lazyload from "./lazyload/reducer"

// экспортируем результат работы функции combineReducers
export default combineReducers({
    cart,
    db,
    sort,
    lazyload,
    modal,
});


