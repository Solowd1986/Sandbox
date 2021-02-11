import api from "../../api/axios/init";

export const getIndexData = (responce) => {
    return {
        type: "server/getIndexData",
        payload: {
            responce
        }
    }
};

export const fetchCategoryProducts = (category) => (dispatch) => {
    setTimeout(() => {
        api.get(`category/${category}`)
            .then(responce => dispatch({ type: "server/fetchCategoryProducts", payload: responce.data }))
            .catch(error => dispatch({ type: "server/serverError", payload: error }))

    }, 3000);

};
