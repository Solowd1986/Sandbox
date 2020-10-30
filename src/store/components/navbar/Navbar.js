import React from "react";
import NavbarList from "./navbar-list/NavbarList";
import styled from "styled-components";

//import "../../../../assets/scss/components/_variables.scss"

import * as S from "../styles/Core"
import MobileNavbar from "./mobile-navbar/MobileNavbar";
import NavbarLogo from "./logo/NavbarLogo";
import NavbarOrder from "./navbar-order/NavbarOrder";


export default class Navbar extends React.Component {

    render() {
        return (
            <S.Container>
                <S.Wrapper>
                    <MobileNavbar/>
                    <NavbarLogo/>
                    <NavbarList/>
                    <NavbarOrder/>
                </S.Wrapper>
            </S.Container>
        )
    }
}