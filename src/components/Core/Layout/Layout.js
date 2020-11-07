import React, {Component} from "react";
import styles from "./layout.module.scss";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Item from "../../test/Item";
import About from "../../test/About";


import Category from "../../Pages/Categorie/Category";

import {Route, Switch, Redirect} from "react-router-dom";
import MainPage from "../../Pages/Index/MainPage";
import Order from "../../Pages/Order/Order";
import Product from "../../Pages/Product/Product";
import UpButton from "../UpButton/UpButton";


export default class Layout extends Component {
    render() {
        return (
            <div className={styles.layout}>

                <UpButton/>
                <Header/>
                <main className={styles.main}>
                    <Switch>
                        <Route path={"/"} component={MainPage} exact/>

                        <Route path={"/category/:type"} component={Category} exact/>
                        <Route path={"/category/:type/:sub"} component={Category} exact/>
                        <Route path={"/product/:category/:name"} component={Product} exact/>

                        <Route path={"/order"} component={Order} exact/>

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






