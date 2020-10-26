import React, {Component} from "react";
import Style from "./layout.module.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import {Router, Route, Switch} from "react-router";
import {BrowserRouter, NavLink} from "react-router-dom";

import Categories from "../test/Categories";
import Item from "../test/Item";
import About from "../test/About";


export default class Layout extends Component {
    render() {
        const links = [
            {to: '/', label: "Root", exact: true},
            {to: '/categories', label: "Categories", exact: true},
            {to: '/product', label: "Product", exact: false},
            {to: '/about', label: "About", exact: true}
        ];

        return (
            <div className={Style.layout}>
                <Header/>
                <main className={Style.main}>
                    <BrowserRouter>
                        <Switch>
                            <Route path={"/categories"} component={Categories}/>
                            <Route path={"/product"} component={Item}/>
                            <Route path={"/about"} component={About}/>
                        </Switch>

                        {links.map((item, index) => {
                            return (
                                <NavLink key={index} to={item.to} exact={item.exact}>{item.label}</NavLink>
                            )
                        })}
                    </BrowserRouter>
                </main>
                <Footer/>
            </div>
        )
    }
}






