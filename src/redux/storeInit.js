import {applyMiddleware, createStore} from "redux";
import reducer from "./reducers/reducer";
import {compose} from "redux";
import reduxThunk from "redux-thunk"
import logger from "./middlwere/logger";
import {createLogger} from "redux-logger";

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


const reduxLogger = createLogger({
        duration: true,
        collapsed: true,
        colors: {
                title: () => "#139BFE",
                prevState: () => "#1c5FAF",
                action: () => "#149945",
                nextState: () => "#A47104",
                error: () => "#ff0005",
        }
});


const preloadedState = JSON.parse(decodeURIComponent(localStorage.getItem("store")));
const enhancedStore = composeEnhancers(applyMiddleware(reduxThunk, reduxLogger, logger));

/**
 * Обычно на данном этапе задается общий reducer, но у нас над ниместь обертка в виде Middleare и компонента отладки,
 * поэтому создан отдельный js-файл по это.
 * Итак:
 * Создаем store, первым аргументом передаем общий reducer, вторым - набор Middlwere (если есть, можно пустой отдать),
 * но для отладчика оборачиваем все в composeEnhancers, чтобы работал redux-dev-tools
 * Также проверяем, если нашли данные в localStorage, то их внесем как начальный initialState, если же ничего не было
 * найдено, то будет использован initialState указанный в reducer
 */
const store =
    preloadedState
        ?
        createStore(reducer, preloadedState, enhancedStore)
        :
        createStore(reducer, enhancedStore)
;

/**
 * Каждый раз, когда меняется store - происходит внесение всего обьекта (кодированного предварительно) в localStorage
 *
 */
store.subscribe(() => {
        localStorage.setItem("store", encodeURIComponent(JSON.stringify(store.getState())));
});

export default store;
