import React from "react";
import styles from "./mobile-navbar.module.scss";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import * as utils from "@components/Helpers/Functions/scrollbarHelper";

class MobileNavbar extends React.Component {

    state = {
        isMobileMenuVisible: false
    };

    addScrollbarOffset = () => document.body.style.overflow = "hidden";
    removeScrollbarOffset = () => document.body.style.removeProperty("overflow");

    toggleMobileMenu = (evt) => {
        !this.state.isMobileMenuVisible ? this.addScrollbarOffset() : this.removeScrollbarOffset();
        this.setState(state => ({ isMobileMenuVisible: !state.isMobileMenuVisible }));
    };

    handlerClickLink = () => {
        this.setState({ isMobileMenuVisible: false });
        this.removeScrollbarOffset();
    };

    handlerResizePage = (evt) => {
        if (this.state.isMobileMenuVisible && evt.currentTarget.innerWidth > 1020) {
            this.removeScrollbarOffset();
            this.setState({ isMobileMenuVisible: false });
        }
    };

    componentDidMount() {
        window.addEventListener("resize", this.handlerResizePage);
    }

    componentWillUnmount() {
        this.removeScrollbarOffset();
        this.setState(state => ({ isMobileMenuVisible: false }));
        window.removeEventListener("resize", this.handlerResizePage);
    }

    render() {
        const classListToggleIcon = classNames(styles.mobile_menu__icon, {
            [styles.mobile_menu__icon__active]: this.state.isMobileMenuVisible,
        });

        const classListMenuWrapper = classNames("animate__animated", "animate__fadeIn", "animate__fast", styles.header__mobile_menu_wrapper);

        return (
            <>
                <div onClick={this.toggleMobileMenu} className={classListToggleIcon}>
                    <span/>
                </div>
                <div className={classListMenuWrapper}>
                    <ul className={styles.header__mobile_menu_list}>
                        <li>
                            <NavLink onClick={this.handlerClickLink} to={"/category/phones"}> Смартфоны</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.handlerClickLink} to={"/category/accessoires"}> Аксессуары</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.handlerClickLink} to={"/category/gadgets"}> Гаджеты</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={this.handlerClickLink} to={"/delivery"}> Доставка</NavLink>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}


export default MobileNavbar;

