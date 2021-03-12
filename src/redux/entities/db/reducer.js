import * as types from "./constants/db"

const initialState = {
    index: null,
    category: null,
    product: null,

    lastIndex: 0,
    fetchingLazyDataStart: false
};


export default (state = initialState, action) => {
    switch (action.type) {

        case types.SERVER_FETCH_PAGE_DATA : {
            return {
                ...state,
                [action.payload.pageType]: action.payload.data
            };
        }

        case types.SERVER_START_FETCH_PAGE_DATA: {
            return {
                ...state,
                fetchingLazyDataStart: true,
            };
        }

        case types.SERVER_FETCH_LAZY_PAGE_DATA: {
            return {
                ...state,
                fetchingLazyDataStart: false,
                lastIndex: state.lastIndex + action.payload.data.length,
                lazy: action.payload.data
            };
        }

        case types.SERVER_CLEAR_CATEGORY_PAGE_REDUX_DATA: {
            return {
                ...state,
                category: null,
                lastIndex: 0,
            };
        }
    }

    return state
}
