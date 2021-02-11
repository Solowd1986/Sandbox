import db from "./mock-data/database"
import api from "../../api/axios/init";

const imgPrefix = "/static/media";

const initialState = {
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
};


export default (state = initialState, action) => {
    switch (action.type) {

        case "server/getIndexData": {
            return {
                ...state,
                index: action.payload
            };
        }

        case "server/getCategoryData": {
            return {
                ...state,
                category: action.payload
            };
        }


        case "server/fetchCategoryProducts": {

            return {
                ...state,
                category: action.payload
            };
        }




        case "server/startRequest": {
            //console.log("start request");
            break;
        }
        case "server/serverError": {
            console.log("error when request " + action.payload.message);
            return {
                ...state,
                category: {
                    main: {},
                    error: true
                }
            };
            break;

        }
    }

    return state
}
