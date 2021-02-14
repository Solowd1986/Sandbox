import { applyMiddleware, createStore } from "redux";
import composeEnhancers from "./middlware/composeEnhancers";
import reduxLogger from "./middlware/reduxLogger"
import reducer from "./entities/rootReducer";

/**
 * With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action.
 * Middleware extends the store's abilities, and lets you write async logic that interacts with the store.
 */
import reduxThunk from "redux-thunk"

const activeMiddlewareList = [
    reduxThunk,
];

/**
 * Проверяем наличие данных в localStorage при первом запуке скрипта.
 */
const preloadedState = JSON.parse(decodeURIComponent(localStorage.getItem("state")));
const enhancedStore = composeEnhancers(applyMiddleware(...activeMiddlewareList));

/**
 * Обычно на данном этапе задается общий reducer, но у нас над ниместь обертка в виде Middleare и компонента отладки,
 * поэтому создан отдельный js-файл по это.
 * Итак:
 * Создаем store,
 * первым аргументом передаем общий reducer,
 * вторым - initialState, если передать, то он будет взят вместо имеющегося в reducer.
 * третьим - набор Middlwere (если есть, можно пустой отдать), но для отладчика оборачиваем все в composeEnhancers, чтобы работал redux-dev-tools
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
 */
// store.subscribe(() => {
//     localStorage.setItem("state", encodeURIComponent(JSON.stringify(store.getState())));
// });

export default store;


