import React, { Component } from "react";
import styles from "./header.module.scss";
import classNames from "classnames";

import MobileNavbar from "./Partials/MobileNavbar";
import Logo from "./Partials/Logo";
import NavbarList from "./Partials/NavbarList";
import Userbar from "./Partials/Userbar";

class Header extends Component {

    state = {
        isPageScrolled: false
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > 200) {
            this.setState({
                isPageScrolled: true
            });
        } else {
            this.setState({
                isPageScrolled: false
            });
        }
    };

    render() {
        const classList = classNames({
            [styles.header_fixed]: this.state.isPageScrolled
        });
        return (
            <header className={classList}>
                <a className={`${styles.portfolio_controls} ${styles.portfolio_controls__right}`} href="#">перейти на GitHub проекта</a>
                <nav className={classNames("wrapper", styles.common)}>
                    <MobileNavbar/>
                    <Logo/>
                    <NavbarList/>
                    <Userbar/>
                </nav>
            </header>
        )
    }
}

export default Header;

