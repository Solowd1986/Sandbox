import React, {Component} from "react";
import Style from "./layout.module.scss";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Categories from "../../test/Categories";
import Item from "../../test/Item";
import About from "../../test/About";


import {Route, Switch, Redirect} from "react-router-dom";

import MainPage from "../../Pages/Index/MainPage";

export default class Layout extends Component {
    render() {
        return (
            <div className={Style.layout}>
                <Header/>
                <main className={Style.main}>
                    <Switch>
                        <Route path={"/"} component={MainPage} exact/>
                        <Route path={"/categories"} component={Categories} exact/>
                        <Route path={"/product/:id/:name"} component={Item} exact/>
                        <Route path={"/about/:name"} component={About}/>
                        <Redirect to={"/"}/> // редирект на главную страницы, если рута не нашлось
                    </Switch>
                </main>
                <Footer/>
            </div>
        )
    }
}






