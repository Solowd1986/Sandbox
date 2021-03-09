import React, { Component } from "react";

import Layout from "@components/Partials/Layout/Layout";
import ErrorBoundary from "@components/Helpers/ErrorBoundary/ErrorBoundary";
import ScrollToTop from "@components/Helpers/Hoc/withScrollToTop/ScrollToTop";

import Secret from "@components/Other/Auth/Secret";
import Login from "@components/Other/Auth/Login";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "@root/routes/routes";

import { Provider } from "react-redux";
import store from "@redux/store";

export default class App extends Component {
    render() {
        return (
            <React.StrictMode>
                <Provider store={store} value={"Provide"}>
                    <BrowserRouter>
                        <ErrorBoundary>
                            <Layout>
                                <ScrollToTop>
                                    <Switch>

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
                                </ScrollToTop>
                            </Layout>
                        </ErrorBoundary>
                    </BrowserRouter>
                </Provider>
            </React.StrictMode>
        )
    }
}

