import React from "react";
import styles from "./mobile-navbar.module.scss";
import {NavLink} from "react-router-dom";

export default class MobileNavbar extends React.Component {

    toggleMobileMenu = (evt) => {
        evt.currentTarget.classList.toggle(`${styles.mobile_menu__icon__active}`);
        evt.currentTarget.nextSibling.classList.toggle(`${styles.header__mobile_menu_wrapper__active}`);
    };

    linkClickHandler = () => {
        const parent = document.querySelector("div[data-type=menu]");
        const icon = document.querySelector("div[data-type=icon]");

        parent.classList.remove(`${styles.header__mobile_menu_wrapper__active}`);
        icon.classList.remove(`${styles.mobile_menu__icon__active}`);
    };


    render() {
        return (
            <>
                <div onClick={this.toggleMobileMenu} className={styles.mobile_menu__icon} data-type={"icon"}>
                    <span/>
                </div>
                <div className={styles.header__mobile_menu_wrapper} data-type={"menu"}>
                    <ul className={styles.header__mobile_menu_list}>
                        <li>
                            <NavLink onClick={this.linkClickHandler} to={"/category/phones"}> Смартфоны</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.linkClickHandler} to={"/category/other/accessoires"}> Аксессуары</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.linkClickHandler} to={"/category/other/gadgets"}> Гаджеты</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.linkClickHandler} to={"/delivery"}> Доставка</NavLink>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}




