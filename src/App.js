import React, {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import styles from "./components/Core/Layout/layout.module.scss";

import UpButton from "./components/Core/UpButton/UpButton";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import routes from "./routes";

export default class App extends Component {
    render() {
        return (
            <React.StrictMode>
                <BrowserRouter>
                    <div className={styles.layout}>
                        <UpButton/>
                        <Header/>
                        <main className={styles.main}>
                            <Switch>
                                {routes.map((route, i) => <Route key={i} path={route.url} component={route.component} exact={route.exact}/>)}
                                <Redirect to={"/"}/> // редирект на главную страницы, если рута не нашлось
                            </Switch>
                        </main>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </React.StrictMode>
        )
    }
}


