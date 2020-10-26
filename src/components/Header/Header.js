import React from "react";
import Style from "./header.module.scss";

const Header = props => (
    <div className={Style.header}>
        <h1 style={{textAlign: "center"}}>Header</h1>
    </div>
);

export default Header;

