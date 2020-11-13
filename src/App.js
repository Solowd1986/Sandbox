import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import routes from "./routes/routes";

import {Provider} from "react-redux";
import store from "./redux/store-init";


const axios = require('axios').default;

import img21 from "./assets/img/111_1.png";
import img22 from "./assets/img/main-page/announcements/announcement-img-android 11-developer.jpg";



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


