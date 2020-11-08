import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import routes from "./routes";

export default class App extends Component {
    render() {
        return (
            <React.StrictMode>
                <Router>
                    <Switch>
                        {routes.map((route) => <Route key={route.url} path={route.url} component={route.component} exact={route.exact}/>)}
                        <Redirect to={"/404"}/> // редирект, если рута не нашлось
                    </Switch>
                </Router>
            </React.StrictMode>
        )
    }
}


