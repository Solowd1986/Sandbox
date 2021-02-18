import db from "./mock-data/database"

import { List } from "immutable";

const initialState = {
    listTestingData: new List([
            { id: 1, name: "Bob" },
            { id: 2, name: "Stan" },
            { id: 3, name: "Glen" },
            { id: 4, name: "Mike" },
        ]
    ),

    index: null,
    category: null,
    product: null,

    lastIndex: 0,
    fetchingLazyDataEnd: true
};


export default (state = initialState, action) => {
    switch (action.type) {


        case "server/fetchPageData": {
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
