import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./routes/routes";

import { Provider } from "react-redux";
import store from "./redux/store";

import Layout from "./components/Core/Layout/Layout";
import ErrorBoundary from "./components/Core/ErrorBoundary/ErrorBoundary";

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

