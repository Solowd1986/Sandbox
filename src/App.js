import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import routes from "./routes";


const axios = require('axios').default;


const reducer2 = (state = {}, action) => {
    switch (action.type) {
        case 'Change' : {
            return {
                appStart: false
            };
            break;
        }
        case 'REQ' : {
            console.log(state.requestCounter);
            console.log(action.value);

            return {
                appStart: true,
                requestCounter: parseInt(state.requestCounter) + parseInt(action.value)
            };
            break;
        }
    }

    return state;
};


import reducer from "./redux/reducer";
import {createStore} from "redux";
import {Provider} from "react-redux";

const store = createStore(reducer);


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


