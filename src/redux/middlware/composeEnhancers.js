import { compose } from "redux";

/**
 * Инициализация блока для отладки redux компонента, в возвращаемую им
 * функцию нужно обернуть в нативный Middlwere для redux
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

export default composeEnhancers;
