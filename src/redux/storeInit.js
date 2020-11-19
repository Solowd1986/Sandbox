import {applyMiddleware, createStore} from "redux";
import reducer from "./reducers/reducer";
import {compose} from "redux";
import logger from "./middlwere/logger";

/**
 * Инициализация блока для отладки redux компонента, в возвращаемую им функцию нужно обренуть нативный Middlwere для redux
 */
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        :
        compose
;


/**
 * Создаем store, первым аргументом передаем общий reducer, вторым - набор Middlwere (если есть, можно пустой отдать),
 * но для отладчика оборачиваем все в composeEnhancers, чтобы работал redux-dev-tools
 */
const store = createStore(reducer, composeEnhancers(applyMiddleware(
    logger
)));

export default store;