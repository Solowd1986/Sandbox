import React, {Component} from "react";
import styles from "./category.module.scss";

export default class PhonesCategory extends Component {
    render() {
        return (
            <>
                <div className={styles.sign_bg}>
                    <img className={styles.sign_bg__img} src="/img/categories/phone-categories/_phone-banner.jpg" alt="Категории"/>
                    <h3 className={styles.sign_bg__title}>Смартфоны</h3>
                </div>

                <div className={styles.title__bg}>
                    <div className={`wrapper`}>
                        <h3 className={styles.title}>OnePlus 8</h3>
                    </div>
                </div>

                <div className={`wrapper`}>
                    <ul className={styles.item_list}>
                        {Array.from(Array(12), (e, i) => {
                            return (
                                <li key={i} className={styles.item}>
                                    <span className={`${styles.item_tag}`}>В наличии</span>
                                    <div className={styles.img_wrapper}>
                                        <img src="/img/categories/phone-categories/8_pro_onyx_black_1_180_367.png" alt="image"/>
                                        <img src="/img/categories/phone-categories/8_pro_onyx_black_2_180_367.png" alt="image"/>
                                    </div>

                                    <span className={styles.item_desc}>Черный оникс</span>
                                    <span className={styles.item_desc}>8GB ОЗУ + 128GB внутренней памяти</span>
                                    <span className={styles.item_desc}>62 990 р</span>
                                    <button className={`btn ${styles.item_buy_btn}`}>Купить</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </>
        )
    }
}

