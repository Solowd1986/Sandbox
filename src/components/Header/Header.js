import React from "react";
import Style from "./header.module.scss";

import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import Categories from "../test/Categories";
import Item from "../test/Item";
import About from "../test/About";


const Header = props => {
    return (
        <div className={Style.header}>
            <div style={{textAlign: "center"}}>
                <ul className={Style.navbar}>
                    <li>
                        <NavLink activeClassName={Style.active} to={"/"} exact>Root</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={Style.active} to={"/categories"}>Categories</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={Style.active} to={"/product/12/iphone"} exact>Product</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={Style.active} to={"/about/cars"}>About</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default Header;

