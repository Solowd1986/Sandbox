import { combineReducers } from "redux";
import cart from "./cart/reducer";
import db from "./db/reducer";
import sort from "./sort/reducer"
import auth from "./auth/reducer"

// экспортируем результат работы функции combineReducers
export default combineReducers({
    cart,
    db,
    sort,
    auth
});


