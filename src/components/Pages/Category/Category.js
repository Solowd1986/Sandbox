import React, {Component} from "react";
import styles from "./category.module.scss";
import Layout from "~components/Core/Layout/Layout";

export default class Category extends Component {

    // always on top of page, without smooth scroll
    componentDidMount() {
        window.scrollTo(0, 0)
    }


    render() {
        return (
            <Layout>
                {
                    this.props.match.params.type === "phones"
                        ?
                        // Phones Category
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

                        :

                        // Other Category
                        <>
                            <div className={styles.sign_bg}>
                                <img className={styles.sign_bg__img} src="/img/categories/accessoires-categorie/cases_banner.jpg" alt="Категории"/>
                                <h3 className={styles.sign_bg__title}>Чехлы и Защита</h3>
                            </div>

                            <div className={styles.title__bg}>
                                <div className={`wrapper`}>
                                    <h3 className={styles.title}>Аксессуары</h3>
                                </div>
                            </div>
                            <div className={`wrapper`}>
                                <ul className={styles.item_list}>
                                    {Array.from(Array(12), (e, i) => {
                                        return (
                                            <li key={i} className={styles.item}>
                                                <span className={`${styles.item_tag}`}>В наличии</span>
                                                <img className={styles.img_centered} src="/img/categories/accessoires-categorie/oneplus_7t_silicone_red_380_380-crop.png"
                                                     alt="image"/>
                                                <span className={styles.item_desc}>Силиконовый защитный чехол для OnePlus 7T красный</span>
                                                <span className={styles.item_desc}>62 990 р</span>
                                                <button className={`btn ${styles.item_buy_btn}`}>Купить</button>
                                            </li>

                                        )
                                    })}
                                </ul>
                            </div>
                        </>
                }
            </Layout>
        )
    }
}
