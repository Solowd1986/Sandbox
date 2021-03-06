import * as types from "./constants/db"

export const fetchPageData = (params) => async (dispatch, getState, api) => {
    const { match: { path: route, params: data }, history } = params;
    const pageType = !Object.keys(data).length ? "index" : route.match(/\/([a-z]*)\/\:/)[1];

    try {
        const response = await api.fetchData(params);
        if (response.data.error) return;
        dispatch({ type: types.SERVER_FETCH_PAGE_DATA, payload: { pageType, data: response.data } })
    } catch (e) {
        history.push("/500");
    }
};



export const clearCategoryPageReduxData = () => {
    return {
        type: types.SERVER_CLEAR_CATEGORY_PAGE_REDUX_DATA,
    }
};


export const fetchLazyCategoryProducts = (category, index, history) => async (dispatch, getState, api) => {
    dispatch({ type: types.SERVER_START_FETCH_PAGE_DATA });
    console.log(category);
    console.log(history);

    const response = await api.get(`lazy/${category}/${index}`);
    console.log(response);

    return


    try {
        const response = await api.fetchData(params);
        if (response.data.error) return;
        dispatch({ type: types.SERVER_FETCH_LAZY_PAGE_DATA, payload: response.data })
    } catch (e) {
        history.push("/500");
    }
};


/*
export const fetchLazyCategoryProducts = (category) => (dispatch, getState, api) => {
    dispatch({ type: types.SERVER_START_FETCH_PAGE_DATA });
    api.get(`category/${category}`)
        .then(responce => {
            dispatch({ type: types.SERVER_FETCH_LAZY_PAGE_DATA, payload: responce.data })
        }).catch(error => {
        console.log('error from server in action fetchLazyCategoryProducts: ', error);
    })
};
*/


