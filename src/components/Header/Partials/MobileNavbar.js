import React from "react";
import styles from "./mobile-navbar.module.scss";
import {NavLink} from "react-router-dom";
import classNames from "classnames";
import * as utils from "../../Core/Modal/helpers/functions";

class MobileNavbar extends React.Component {
    state = {
        isMobileMenuVisible: false
    };

    toggleMobileMenu = (evt) => {
        this.state.isMobileMenuVisible ? utils.removeScrollbarOffset() : utils.addScrollbarOffset();
        this.setState((state) => {
            return {
                isMobileMenuVisible: !this.state.isMobileMenuVisible
            }
        });
    };

    linkClickHandler = () => {
        this.setState((state) => {
            return {
                isMobileMenuVisible: false
            }
        });
        document.body.classList.remove(styles.mobile_menu_body_fixed);
    };

    render() {
        const classList = classNames(styles.mobile_menu__icon, {
            [styles.mobile_menu__icon__active]: this.state.isMobileMenuVisible === true,
        });

        const classList2 = classNames("animate__fadeIn", "animate__animated", "animate__fast");
        return (
            <>
                <div onClick={this.toggleMobileMenu} className={classList}>
                    <span/>
                </div>
                <div className={`${styles.header__mobile_menu_wrapper} ${classList2}`}>
                    <ul className={styles.header__mobile_menu_list}>
                        <li>
                            <NavLink onClick={this.linkClickHandler} to={"/category/phones"}> Смартфоны</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.linkClickHandler} to={"/category/accessoires"}> Аксессуары</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.linkClickHandler} to={"/category/gadgets"}> Гаджеты</NavLink>
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


export default MobileNavbar;

