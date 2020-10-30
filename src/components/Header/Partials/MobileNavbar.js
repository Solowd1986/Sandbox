import React from "react";
import styles from "./mobile-navbar.module.scss";

export default class MobileNavbar extends React.Component {
    render() {
        return (
            <>
                <div className={styles.mobile_menu__icon}>
                    <span/>
                </div>
                <div className={styles.header__mobile_menu_wrapper}>
                    <ul className={styles.header__mobile_menu_list}>
                        <li>
                            <a href=""> Смартфоны</a>
                        </li>
                        <li>
                            <a href=""> Аксессуары</a>
                        </li>
                        <li>
                            <a href=""> Гаджеты</a>
                        </li>
                        <li>
                            <a href=""> Доставка</a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}




