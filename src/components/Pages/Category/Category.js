import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./category.module.scss";
import Layout from "~components/Core/Layout/Layout";
import {connect} from "react-redux";

class Category extends Component {

    // always on top of page, without smooth scroll
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const category = this.props.category.find(category => category.categoryAlias === this.props.match.params.type);

        return (
            <Layout>
                <div className={styles.sign_bg}>
                    <img className={styles.sign_bg__img} src={`${category.imgPrefix}${category.categoryAlias}/${category.categoryTitleImg}`} alt="Категории"/>
                    <h3 className={styles.sign_bg__title}>{category.categoryTitle}</h3>
                </div>

                <div className={styles.title__bg}>
                    <div className={common.wrapper}>
                        {/*<h3 className={styles.title}>{category.categoryTitle}</h3>*/}
                    </div>
                </div>
                <div className={common.wrapper}>

                    <ul className={styles.item_list}>
                        {Array.from(Array(3), (e, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {category.productList.map(item => {
                                        return (
                                            <li key={item.id} className={styles.item}>
                                    <span className={
                                        item.rest > 0
                                            ? `${styles.tag}`
                                            : `${styles.tag} ${styles.tag__not_in_stock}`}>
                                        В наличии
                                    </span>

                                                <img
                                                    className={styles.img_centered}
                                                    src={`${category.imgPrefix}${category.categoryAlias}/${item.imgPath}`}
                                                    //src="/img/categories/accessoires-categorie/oneplus_7t_silicone_red_380_380-crop.png"
                                                    alt="image"
                                                />

                                                <div className={styles.item_desc}>
                                                    <span>{item.title}</span>
                                                    <span>Цвет: {item.color}</span>
                                                </div>

                                                <span className={styles.price}>
                                        {item.discount && <span className={styles.price__old}>{item.price} р.</span>}
                                                    {item.discount ? item.price - 4000 : item.price} р.
                                    </span>

                                                <button className={`${common.btn} ${styles.item_buy_btn}`}>Купить</button>
                                            </li>
                                        )
                                    })}
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </div>
            </Layout>
        )
    }
}

const getState = (state) => {
    return {
        category: state.db.category
    }

};

export default connect(getState)(Category);
