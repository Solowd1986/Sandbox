
import React, {Component} from "react";
import styles from "./layout.module.scss";
import UpButton from "../UpButton/UpButton";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

export default class Layout extends Component {
    render() {
        return (
            <div className={styles.layout}>
                <UpButton/>
                <Header/>
                <main className={styles.main}>
                    {this.props.children}
                </main>
                <Footer/>
            </div>
        )
    }
}