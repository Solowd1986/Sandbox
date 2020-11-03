import React, {Component} from "react";
import Style from "./layout.module.scss";

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


// class Test {
//     constructor(props) {
//         this.selfProp = props;
//     }
//     commonProp = "common1";
//     show () {
//         console.log(this.commonProp);
//     }
// }
//
// const m = new Test("a");
// const m2 = new Test("2");
// console.log(m.commonProp);
// console.log(m2.commonProp);
// console.log(m.show());
// console.log(m2.show());



export default class Layout extends Component {
    render() {
        return (
            <div className={Style.layout}>
                <UpButton/>
                <Header/>
                <main className={Style.main}>
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






