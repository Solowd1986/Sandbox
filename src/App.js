import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import routes from "./routes/routes";

import {Provider} from "react-redux";
import store from "./redux/store";
import "./utils/whyDidYouRender";


import api from "./redux/api/axios/init";

const loadAxios = () => (dispatch) => {
    api.get("index")
        .then(responce => dispatch({ type: "server/getIndexData", payload: responce.data }))
        .catch(error => dispatch({ type: "server/serverError", payload: error }))
};


// store.dispatch((dispatch) => {
//     fetch("api/index", { method: "GET" }).then((result) => result.json()).then((result) => {
//         dispatch({ type: "server/getIndexData", payload: result })
//     }).catch(error => dispatch({ type: "server/serverError", payload: error }));
// });

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
                    <Router>
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
                    </Router>
                </Provider>
            </React.StrictMode>
        )
    }
}


