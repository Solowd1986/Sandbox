import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./header.module.scss";

import MobileNavbar from "./Partials/MobileNavbar";
import Logo from "./Partials/Logo";
import NavbarList from "./Partials/NavbarList";
import Userbar from "./Partials/Userbar";
import { NavLink } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageScrolled: false
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
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
        return (
            <header className={`${this.state.isPageScrolled ? styles.header_fixed : ''}`} data-fs={true}>
                <NavLink to={"/admin"}>
                    <span className={`${styles.portfolio_controls} ${styles.portfolio_controls__left}`}>admin</span>
                </NavLink>
                <a className={`${styles.portfolio_controls} ${styles.portfolio_controls__right}`} href="#">перейти на GitHub проекта</a>
                <nav className={`${common.wrapper} ${styles.header}`}>
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

