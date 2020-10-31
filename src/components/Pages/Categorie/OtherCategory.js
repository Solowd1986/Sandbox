import React, {Component} from "react";
import styles from "./category.module.scss";

export default class OtherCategory extends Component {
    render() {
        return (
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
                                    <img className={styles.img_centered} src="/img/categories/accessoires-categorie/oneplus_7t_silicone_red_380_380-crop.png" alt="image"/>
                                    <span className={styles.item_desc}>Силиконовый защитный чехол для OnePlus 7T красный</span>
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
