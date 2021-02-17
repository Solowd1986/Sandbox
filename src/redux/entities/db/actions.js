import api from "../../api/axios/init";


// const loadAxios = () => (dispatch) => {
//     api.get("index")
//         .then(responce => dispatch({ type: "server/getIndexData", payload: responce.data }))
//         .catch(error => dispatch({ type: "server/serverError", payload: error }))
// };
// store.dispatch(loadAxios());


export const getData = () => (dispatch) => {

    fetch("/api/index").then(res => res.json()).then(res => {
        //console.log('fetch finished');
        dispatch({ type: "server/getIndexData", payload: res })
    }).catch(error => {
        console.dir(error);
        console.log('error from server in action getData: ', error);

    });

    // api.get(`/index`)
    //     .then(responce => {
    //         //console.dir('success');
    //         dispatch({ type: "server/getIndexData", payload: responce.data })
    //     }).catch(error => {
    //     console.log('error from server in action getData: ', error);
    //     //dispatch({ type: "server/serverError", payload: error })
    // });
};


export const fetchPageData = (params) => (dispatch) => {

    /**
     \/([a-z]*)\/\:

     */

    fetch("/api/index").then(res => res.json()).then(res => {
        console.log('fetch finished');
        dispatch({ type: "server/getIndexData", payload: res })
    }).catch(error => {
        console.dir(error);
        console.log('error from server in action getData: ', error);

    });

    // api.get(`/index`)
    //     .then(responce => {
    //         //console.dir('success');
    //         dispatch({ type: "server/getIndexData", payload: responce.data })
    //     }).catch(error => {
    //     console.log('error from server in action getData: ', error);
    //     //dispatch({ type: "server/serverError", payload: error })
    // });
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


const getResource = async (uri) => {
    const responce = await fetch(uri);
    if (!responce.ok) {
        throw new Error(`Could notfetch ${uri} redcived ${responce.status}`);
    }
    return await responce.json();
};


export const fetchLazyCategoryProducts = (category) => (dispatch) => {
    //console.log('start request to server from action db fetchCategoryProducts');

    //console.log(category);

    // getResource(`/api/category/${category}`).then(responce => {
    //     //console.dir('success');
    //
    //     console.log(responce);
    //
    //     dispatch({ type: "server/fetchLazyCategoryProducts", payload: responce })
    // }).catch(error => {
    //     console.log('error from server in action fetchLazyCategoryProducts: ', error);
    //     dispatch({ type: "server/serverError", payload: error })
    // })

    api.get(`category/${category}`)
        .then(responce => {
            //console.dir('success');

            dispatch({ type: "server/fetchLazyCategoryProducts", payload: responce.data })
        }).catch(error => {

            console.log('error from server in action fetchLazyCategoryProducts: ', error);
            dispatch({ type: "server/serverError", payload: error })

    })

};


async function getter2(category) {
    const response = await api.get(`category/${category}`);
    console.log(response);


}




export const fetchCategoryProducts = (category, history) => (dispatch) => {
    //console.log('start request to server from action db fetchCategoryProducts');

    async function getter2(category) {


        try {
            const response = await api.get(`category/${category}`);

            console.log('respose', response);
            if (response.code === "ECONNABORTED") {
                console.log('error getter2');
            }
        } catch (e) {
            console.dir(e);
            if (e.code === "ECONNABORTED1") {
                console.log('await timeout', e);
            } else {
                console.log('await another logic', e);
            }
        }
    }


    //getter2(category).catch(error => console.log('error getter', error));

    api.get(`category/${category}`)
        .then(responce => {
            //console.dir('success');
            dispatch({ type: "server/fetchCategoryProducts", payload: responce.data })
        }).catch(error => {
        //document.location.href = 'http://localhost:3000/404'; // error lcoation redirect
        //console.dir(error);
        console.log('error from server in action fetchCategoryProducts: ', error);

        //history.push('/500');

        return;


        //onst { isAxiosError, message, code } = error;

        //console.dir(error);
        if (error.code === "ECONNABORTED") {
            console.log('first fail');

            api.get(error.config.url).then(response => {
                dispatch({ type: "server/fetchCategoryProducts", payload: response.data })
            }).catch(error => {
                if (error.code === "ECONNABORTED") {
                    api.get(error.config.url).then(response => {
                        dispatch({ type: "server/fetchCategoryProducts", payload: response.data })
                    }).catch(err => console.log("Massive fail"));
                }
            })
        }

        //return Promise.reject(e);
        //console.log('error from server in action fetchCategoryProducts: ', error);
        //throw new Error(error);
        //dispatch({ type: "server/serverError", payload: {error: {...error, message: error.message}} })
        }
    )
};


export const fetchCategoryProducts2 = (category) => (dispatch) => {
    //console.log('start request to server from action db fetchCategoryProducts');
    fetch(`api/category/${category}`).then((res) => res.json()).then((res) => {
        dispatch({ type: "server/fetchCategoryProducts", payload: res })

    }).catch(error => console.log(error));


    // api.get(`category/${category}`)
    //     .then(responce => {
    //         //console.dir('success');
    //
    //         dispatch({ type: "server/fetchCategoryProducts", payload: responce.data })
    //     }).catch(error => {
    //         console.log('error from server in action fetchCategoryProducts: ', error);
    //         //throw new Error(error);
    //         dispatch({ type: "server/serverError", payload: error })
    //     }
    // )
};




export const fetchProductData = (category, id) => (dispatch) => {
    api.get(`product/${category}/${id}`)
        .then(responce => dispatch({ type: "server/fetchProductData", payload: responce.data }))
        .catch(error => dispatch({ type: "server/serverError", payload: error }))
};
