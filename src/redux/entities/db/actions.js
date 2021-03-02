import * as types from "./constants/db"

export const fetchPageData = (params) => (dispatch, getState, api) => {
    const { match: { path: route, params: data }, history } = params;
    const pageType = !Object.keys(data).length ? "index" : route.match(/\/([a-z]*)\/\:/)[1];
    const apiRoute =
        !Object.keys(data).length
            ? "index"
            : route.match(/\/([a-z]*)\/\:/)[1] + "/" + Object.values(data).join("/");
    api.get(apiRoute)
        .then(response => {
            if (response.data.error) history.push("/404");
            dispatch({ type: types.SERVER_FETCH_PAGE_DATA, payload: { pageType, data: response.data } })
        }).catch(error => {
        if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
            api.get(apiRoute)
                .then(response => {
                    dispatch({ type: types.SERVER_FETCH_PAGE_DATA, payload: response.data })
                }).catch(error => {
                if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                    api.get(apiRoute)
                        .then(response => {
                            dispatch({ type: types.SERVER_FETCH_PAGE_DATA, payload: response.data })
                        }).catch(error => {
                        if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                            history.push("/500");
                        }
                    })
                }
            })
        }
    });
};



export const fetchingLazy = () => {
    return {
        type: "server/fetchingLazy",
    }
};

export const fetchLazyCategoryProducts = (category) => (dispatch, getState, api) => {
    api.get(`category/${category}`)
        .then(responce => {
            //console.dir('success');
            dispatch({ type: "server/fetchLazyCategoryProducts", payload: responce.data })
        }).catch(error => {

        console.log('error from server in action fetchLazyCategoryProducts: ', error);
        dispatch({ type: "server/serverError", payload: error })

    })

};



