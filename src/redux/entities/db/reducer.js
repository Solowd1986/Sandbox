import * as types from "./constants/db"

const initialState = {
    index: null,
    category: null,
    product: null,

    lastIndex: 0,
    fetchingLazyDataEnd: true
};


export default (state = initialState, action) => {
    switch (action.type) {
        case types.SERVER_FETCH_PAGE_DATA : {
            return {
                ...state,
                [action.payload.pageType]: action.payload.data
            };
        }


        case "server/fetchingLazy": {
            return {
                ...state,
                fetchingLazyDataEnd: false,
            };
        }


        case "server/fetchLazyCategoryProducts": {
            //console.log(action.payload);

            return {
                ...state,
                fetchingLazyDataEnd: true,
                lastIndex: state.lastIndex + action.payload.data.length,
                lazy: action.payload.data
            };
        }




        case "server/startRequest": {
            //console.log("start request");
            break;
        }

        case "server/serverError": {
            //console.log('error', action);
            const error = action.payload.error;
            //console.dir(error);
            if (error && error.message) {
                console.log('code - ' + error.code + '. Message - ' + error.message);
            }

            return state;
        }
    }

    return state
}
