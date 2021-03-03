import { compose } from "redux";

/**
 * Инициализация блока для отладки redux компонента, в возвращаемую им
 * функцию нужно обернуть в нативный Middlwere для redux
 */

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers =
    typeof window === 'object' && process.env.NODE_ENV === 'development' && devtools
        ?
        devtools({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        :
        compose
;

export default composeEnhancers;
