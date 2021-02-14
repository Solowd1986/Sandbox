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
    product: {},
    lastIndex: 0,
    fetchingLazyDataEnd: true
};


export default (state = initialState, action) => {
    switch (action.type) {

        case "server/getIndexData": {
            return {
                ...state,
                index: action.payload
            };
        }

        case "server/fetchingLazy": {
            return {
                ...state,
                fetchingLazyDataEnd: false,
            };
        }


        case "server/getCategoryData": {
            return {
                ...state,
                category: action.payload
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

        case "server/fetchCategoryProducts": {

            return {
                ...state,
                category: action.payload
            };
        }

        case "server/fetchProductData": {

            return {
                ...state,
                product: action.payload
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
                product: {}
            };
            break;
        }

        case "server/serverError": {
            //console.log('error', action);

            //console.log("error when request server/serverError -" + action.payload);
            // return {
            //     ...state,
            //     category: {
            //         main: {},
            //         error: true
            //     }
            // };
            break;

        }
    }

    return state
}
