import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import routes from "./routes/routes";

import {Provider} from "react-redux";
import store from "./redux/store-init";


const axios = require('axios').default;

axios.get('api.php')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });


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


