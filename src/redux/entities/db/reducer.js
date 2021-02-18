import db from "./mock-data/database"
import api from "../../api/axios/init";
import { List } from "immutable";

const imgPrefix = "/static/media";

const initialState = {
    listTestingData: new List([
            { id: 1, name: "Bob" },
            { id: 2, name: "Stan" },
            { id: 3, name: "Glen" },
            { id: 4, name: "Mike" },
        ]
    ),

    slider: [
        {
            imgPrefix,
            imgFullPath: "slider-1-lg-1920_600.jpg",
            imgSmPath: "slider-1-sm-530_400.jpg",
            imgAlt: "slider-image"
        },
        {
            imgPrefix,
            imgFullPath: "slider-2-lg-1920_600.jpg",
            imgSmPath: "slider-2-sm-530_400.jpg",
            imgAlt: "slider-image"
        },
        {
            imgPrefix,
            imgFullPath: "slider-3-lg-1920_600.jpg",
            imgSmPath: "slider-3-sm-530_400.jpg",
            imgAlt: "slider-image"
        },
        {
            imgPrefix,
            imgFullPath: "slider-4-lg-1920_600.jpg",
            imgSmPath: "slider-4-sm-530_400.jpg",
            imgAlt: "slider-image"
        },
        {
            imgPrefix,
            imgFullPath: "slider-5-lg-1920_600.jpg",
            imgSmPath: "slider-5-sm-530_400.jpg",
            imgAlt: "slider-image"
        }
    ],

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
                [action.payload.page]: action.payload.data
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

        case "server/clearProduct": {
            //console.log("start request");
            return {
                ...state,
                product: null
            };
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
