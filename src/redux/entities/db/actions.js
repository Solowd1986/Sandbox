//import api from "../../api/axios/init";


export const fetchPageData = (params) => (dispatch, getState, api) => {
    const { match: { path: route, params: data }, history } = params;
    //console.log(route);
    //console.log(data);
    //console.log(history);


    const pageType = !Object.keys(data).length ? "index" : route.match(/\/([a-z]*)\/\:/)[1];
    const apiRoute =
        !Object.keys(data).length
            ? "index"
            : route.match(/\/([a-z]*)\/\:/)[1] + "/" + Object.values(data).join("/");

    api.get(apiRoute)
        .then(response => {
            //console.dir('success');
            //console.log(response.data);
            if (response.data.error) history.push("/404");
            dispatch({ type: "server/fetchPageData", payload: { pageType, data: response.data } })
        }).catch(error => {
        console.dir(error);
        return
        //console.log('fail 1');
        //console.dir(error);
        if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
            api.get(apiRoute)
                .then(response => {
                    dispatch({ type: "server/fetchPageData", payload: response.data })
                }).catch(error => {

                //console.log('fail 2');

                if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                    api.get(apiRoute)
                        .then(response => {
                            dispatch({ type: "server/fetchPageData", payload: response.data })
                            //console.log('succ 3');
                        }).catch(error => {
                        //console.log('fail 3');
                        if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                            //console.log('fail 33');
                            history.push("/500");
                        }
                    })
                }
            })
        }
    });
};


export const clearProduct = () => {
    return {
        type: "server/clearProduct",
    }
};

export const fetchingLazy = () => {
    return {
        type: "server/fetchingLazy",
    }
};

export const fetchLazyCategoryProducts = (category) => (dispatch) => {
    api.get(`category/${category}`)
        .then(responce => {
            //console.dir('success');

            dispatch({ type: "server/fetchLazyCategoryProducts", payload: responce.data })
        }).catch(error => {

        console.log('error from server in action fetchLazyCategoryProducts: ', error);
        dispatch({ type: "server/serverError", payload: error })

    })

};



