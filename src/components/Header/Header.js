
import React from "react";
import styles from "./header.module.scss";

import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";

import MobileNavbar from "./Partials/MobileNavbar";
import Logo from "./Partials/Logo";
import NavbarList from "./Partials/NavbarList";
import Userbar from "./Partials/Userbar";

const Header = props => {
    return (
        <>
            <a className={`${styles.portfolio_controls} ${styles.portfolio_controls__left}`} href="#"> вернуться к списку</a>
            <a className={`${styles.portfolio_controls} ${styles.portfolio_controls__right}`} href="#"> перейти на GitHub сайта</a>

            <nav className={`wrapper ${styles.header}`}>
                <MobileNavbar/>
                <Logo/>
                <NavbarList/>
                <Userbar/>
            </nav>

        </>
    )
};

export default Header;

