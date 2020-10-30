import classNames from "classnames";
import React from "react";
import styles from "./promo.module.scss";

const Promo = props => {
    return (
        <section className={`container ${styles.promo_wrapper}`}>
            <main className={`wrapper ${styles.promo}`}>
                <h2 className={styles.promo_section_title}>Рекомендуем</h2>
                <ul className={styles.promo_list}>
                    {Array.from(Array(4), (e, i) => {
                        return (
                            <li key={i} className={styles.promo_list__item}>
                                <span className={styles.promo_list__tag}>В наличии</span>
                                <a className={styles.promo_list__link} href="item.html">
                                    <img className={styles.promo_list__img} src="img/main-page/phone-main-page/oneplus_6t_6gb_128gb_black_275_1.png" alt="image"/>
                                </a>
                                <span className={styles.promo_list__title}>Oneplus 7 Pro 8GB + 256GB (туманный синий)</span>
                                <span className={styles.promo_list__price}><span className={styles.promo_list__price__old}>55 000 р.</span>44 000 р.</span>
                                <button className={classNames(styles.btn, styles.promo_list__btn)}>Купить</button>
                            </li>
                        )
                    })}
                </ul>
                <h2 className={styles.promo_section_title}>Популярные гаджеты</h2>
                <ul className={styles.promo_list}>
                    {Array.from(Array(4), (e, i) => {
                        return (
                            <li key={i} className={styles.promo_list__item}>
                                <span className={styles.promo_list__tag}>В наличии</span>
                                <a className={styles.promo_list__link} href="item.html">
                                    <img className={styles.promo_list__img} src="img/main-page/phone-main-page/oneplus_6t_6gb_128gb_black_275_1.png" alt="image"/>
                                </a>
                                <span className={styles.promo_list__title}>Oneplus 7 Pro 8GB + 256GB (туманный синий)</span>
                                <span className={styles.promo_list__price}><span className={styles.promo_list__price__old}>55 000 р.</span>44 000 р.</span>
                                <button className={classNames(styles.btn, styles.promo_list__btn)}>Купить</button>
                            </li>
                        )
                    })}
                </ul>
                <h2 className={styles.promo_section_title}>Аксессуары</h2>
                <ul className={styles.promo_list}>
                    {Array.from(Array(4), (e, i) => {
                        return (
                            <li key={i} className={styles.promo_list__item}>
                                <span className={styles.promo_list__tag}>В наличии</span>
                                <a className={styles.promo_list__link} href="item.html">
                                    <img className={styles.promo_list__img} src="img/main-page/phone-main-page/oneplus_6t_6gb_128gb_black_275_1.png" alt="image"/>
                                </a>
                                <span className={styles.promo_list__title}>Oneplus 7 Pro 8GB + 256GB (туманный синий)</span>
                                <span className={styles.promo_list__price}><span className={styles.promo_list__price__old}>55 000 р.</span>44 000 р.</span>
                                <button className={classNames(styles.btn, styles.promo_list__btn)}>Купить</button>
                            </li>
                        )
                    })}
                </ul>
            </main>
        </section>

    )
};

export default Promo;

