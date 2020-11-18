
import React from "react";
import common from "~scss/common.module.scss";
import styles from "./header.module.scss";

import MobileNavbar from "./Partials/MobileNavbar";
import Logo from "./Partials/Logo";
import NavbarList from "./Partials/NavbarList";
import Userbar from "./Partials/Userbar";

const Header = props => {
    return (
        <>
            <a className={`${styles.portfolio_controls} ${styles.portfolio_controls__left}`}
               href="">
                вернуться
            </a>
            <a className={`${styles.portfolio_controls} ${styles.portfolio_controls__right}`} href="#"> перейти на GitHub сайта</a>

            <nav className={`${common.wrapper} ${styles.header}`}>
                <MobileNavbar/>
                <Logo/>
                <NavbarList/>
                <Userbar/>
            </nav>

        </>
    )
};

export default Header;

