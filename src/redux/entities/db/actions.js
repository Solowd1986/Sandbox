import api from "../../api/axios/init";

export const getIndexData = (responce) => {
    return {
        type: "server/getIndexData",
        payload: {
            responce
        }
    }
};

export const clearProduct = () => {
    return {
        type: "server/clearProduct",
    }
};


export const fetchCategoryProducts = (category) => (dispatch) => {
    //console.log('start request to server from action db fetchCategoryProducts');

    api.get(`category/${category}`)
        .then(responce => {
            //console.dir('success');

            dispatch({ type: "server/fetchCategoryProducts", payload: responce.data })
        }).catch(error => {
            console.log('error from server in action fetchCategoryProducts: ', error);
            dispatch({ type: "server/serverError", payload: error })
        }
    )
};


export const fetchProductData = (category, id) => (dispatch) => {
    api.get(`product/${category}/${id}`)
        .then(responce => dispatch({ type: "server/fetchProductData", payload: responce.data }))
        .catch(error => dispatch({ type: "server/serverError", payload: error }))
};
