import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "../../routes/routes";

import { Provider } from "react-redux";
import store from "../../redux/store";

import Layout from "../../components/Core/Layout/Layout";
import ErrorBoundary from "../../components/Core/ErrorBoundary/ErrorBoundary";


import Secret from "../Core/Auth/Secret";
import Login from "../Core/Auth/Login";
import Error404 from "../Pages/Error404/Error404";

const hello = (props) => {
debugger;
    return <div>Hello</div>;
};

export default class App extends Component {
    render() {
        return (
            <React.StrictMode>
                <Provider store={store} value={"Provide"}>
                    <BrowserRouter>
                        <ErrorBoundary>
                            <Layout>
                                <Switch>
                                    <Route path={"/name"} render={({ history }) => {
                                        //console.log({history});
                                        return (
                                            <div onClick={() => history.push("5")}>Hello</div>
                                        )
                                    }}/>
                                    <Route path={"/secret"} component={Secret}/>
                                    <Route path={"/login"} component={Login}/>
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

