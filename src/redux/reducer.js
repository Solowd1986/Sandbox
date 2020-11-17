
import {combineReducers} from "redux";
import cart from "./reducers/cart.reducer";
import db from "./reducers/modal.reducer"

// экспортируем результат работы функции combineReducers
export default combineReducers({
    cart,
    db
});











