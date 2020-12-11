import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import routes from "./routes/routes";

import {Provider} from "react-redux";
import store from "./redux/storeInit";


function apiRequest(url) {
    return fetch(url).then((responce, reject) => {
        if (responce.status !== 200) {
            return responce.text().then((text) => reject(text));
        }
        return responce.json();
    })
}

apiRequest("api.php").then((res) => {
    //console.log(res);
}).catch((error) => console.log("error", error));


const axios = require('axios').default;

axios.get('/api/get/all')
    .then(function (response) {
        // handle success
        //console.log("responce", response);
    }).catch(function (error) {
    //console.log("Axios Error - ", error);
}).then(function () {
    // always executed
});


function asyncAction(action) {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await action();
            resolve(true);
        } catch (e) {
            console.log(e);
        }
    })
}


axios.get('/api/get/id/1')
    .then(function (response) {
        // handle success
        //console.log("responce", response);
    }).catch(function (error) {
    //
    // console.log("Axios Error - ", error);
}).then(function () {
    // always executed
});


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
                            {routes.map((route) => <Route key={route.url} path={route.url} component={route.component} exact={route.exact}/>)}
                            <Redirect to={"/404"}/> // редирект, если рута не нашлось
                        </Switch>
                    </Router>
                </Provider>
            </React.StrictMode>
        )
    }
}


