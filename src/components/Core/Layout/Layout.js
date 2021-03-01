import React, { Component } from "react";
import styles from "./layout.module.scss";
import UpButton from "../UpButton/UpButton";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const Layout = ({ children }) => (
    <div className={styles.layout}>
        <UpButton/>
        <Header/>
        <main className={styles.main}>
            {children}
        </main>
        <Footer/>
    </div>
);

export default Layout;
