import React, { Component } from "react";
import styles from "./header.module.scss";
import cn from "classnames";

import MobileNavbar from "./Partials/MobileNavbar/MobileNavbar";
import Logo from "./Partials/Logo/Logo";
import NavbarList from "./Partials/NavbarList/NavbarList";
import Userbar from "./Partials/Userbar/Userbar";

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
        window.scrollY > document.body.clientHeight
            ? this.setState({ isPageScrolled: true })
            : this.setState({ isPageScrolled: false })
    };

    render() {
        const classList = cn({
            [styles.header_fixed]: this.state.isPageScrolled
        });
        return (
            <header className={classList}>
                <a className={`${styles.portfolio_controls} ${styles.portfolio_controls__right}`} href="#">перейти на GitHub проекта</a>
                <nav className={cn("wrapper", styles.common)}>
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

