import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import routes, { listOfAllowedRoutes } from "./routes/routes";

import { Provider } from "react-redux";
import store from "./redux/store";
import "./utils/whyDidYouRender";


import api from "./redux/api/axios/init";
import Layout from "./components/Core/Layout/Layout";
import ErrorBoundary from "./components/Core/ErrorBoundary/ErrorBoundary";

import ApiService from "./redux/api/ApiService/ApiService";
//ApiService.get("index").then(res => console.log('res', res));


// class ApiService {
//     constructor() {
//         this._axios = require('axios').default;
//
//         this.api = this._axios.create({
//             baseURL: "/api/",
//             timeout: 1000 * 5,
//             withCredentials: true
//         });
//     }
//
//     get = async (uri) => await this.api.get(uri);
//     getIndex = async () => await this.api.get("index");
//     getCategory = async (category) => await this.api.get(`category/${category}`);
//     getProduct = async (category, id) => await this.api.get(`product/${category}/${id}`);
// }
// export default new ApiService();


const getResource = async (uri) => {
    const responce = await fetch(uri);
    if (!responce.ok) {
        throw new Error(`Could notfetch ${uri} redcived ${responce.status}`);
    }
    return await responce.json();
};


//console.dir(window.location.pathname);

//const route = [""];

// if (window.location.pathname === "/") {
//     const loadAxios = () => (dispatch) => {
//         api.get("index")
//             .then(responce => dispatch({ type: "server/getIndexData", payload: responce.data }))
//             .catch(error => dispatch({ type: "server/serverError", payload: error }))
//     };
//     store.dispatch(loadAxios());
// }


//const matches = location.pathname;


const loadAxios = () => (dispatch) => {
    api.get("index")
        .then(responce => dispatch({ type: "server/getIndexData", payload: responce.data }))
        .catch(error => dispatch({ type: "server/serverError", payload: error }))
};
store.dispatch(loadAxios());



// axios.get('/api/index')
//     .then(function (response) {
//         // handle success
//         //console.log("responce", response);
//         //store.dispatch(() => ({type: ""}))
//     }).catch(function (error) {
//     //console.log("Axios Error - ", error);
// }).then(function () {
//     // always executed
// });


/**
 * Logic of first loading, get data from server
 */
export default class App extends Component {
    render() {
        return (
            <React.StrictMode>
                <Provider store={store}>
                    <BrowserRouter>
                        <ErrorBoundary>
                            <Layout>
                                <Switch>
                                    {routes.map((route) =>
                                        <Route
                                            key={route.url}
                                            path={route.url}
                                            component={route.component}
                                            exact={route.exact}/>)
                                    }
                                    <Redirect to={"/404"}/> // редирект, если рута не нашлось
                                </Switch>
                            </Layout>
                        </ErrorBoundary>
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
        )
    }
}


