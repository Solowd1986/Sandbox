import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./product.module.scss";

import {NavLink} from "react-router-dom";
import Layout from "~components/Core/Layout/Layout";

import PromoBadge from "../../PromoBadge/PromoBadge";
import Features from "./Features";
import Specification from "./Specification";
import ProductDelivery from "./ProductDelivery";
import actions from "../../../redux/actions";
import {connect} from "react-redux";


class Product extends Component {

    tabsHandler = (evt) => {
        const tabsLinks = document.querySelectorAll(`.${styles.info__nav_link}`);
        tabsLinks.forEach(item => item.classList.remove(styles.info__nav_link__active));
        evt.target.classList.add(styles.info__nav_link__active);

        const tabsBlocks = document.querySelectorAll(`.${styles.tab}`);
        tabsBlocks.forEach(item => item.classList.remove(styles.tab_active));
        Array.from(tabsBlocks)
            .find(item => item.id === evt.target.dataset.id)
            .classList.add(...[`${styles.tab_active}`, "animate__animated", "animate__fadeIn"]);
    };

    // always on top of page, without smooth scroll
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        console.log(this.props);

        const id = parseInt(this.props.match.params.id);
        const category = this.props.db.category.find(item => item.categoryAlias === this.props.match.params.category);
        const product = this.props.db.category.find(item => item.categoryAlias === category.categoryAlias).productList.find(item => item.id === id);


        console.log(product);

        return (
            <Layout>
                <section className={`${common.container} ${styles.item_bg}`}>
                    <div className={`${common.wrapper} ${styles.order}`}>
                        <div className={styles.order__img_wrapper}>
                            <img
                                className={styles.order__img}
                                src={`${category.imgPrefix}/${category.categoryAlias}/${product.imgLgPath}`}
                                alt={product.imgAlt}
                            />
                            <div className={styles.order__slider}>
                                <img className="" width="60" height="60" src="/static/media/accessoires/oneplus_bullets_wireless_600_1.png" alt="generic_img"/>
                                <img className="" width="60" height="60" src="/static/media/accessoires/oneplus_bullets_wireless_600_2.png" alt="generic_img"/>
                            </div>
                        </div>

                        <div className={styles.order__info_wrapper}>
                            <h1 className={styles.order__title}>{product.title}</h1>
                            <p className={styles.order__desc}>OnePlus Bullets Wireless дают Вам ту свободу и удобство, которой Вам так не хватало.</p>

                            <span className={styles.order__price}>
                                {
                                    product.rest === 0 || !product.discount
                                        ?
                                        <>
                                            {new Intl.NumberFormat().format(product.price)} р.
                                        </>
                                        :
                                        <>
                                            <span className={styles.order__price__discount}>{new Intl.NumberFormat().format(product.price)} р.</span>
                                            {new Intl.NumberFormat().format(product.price - (product.price * 10 / 100))} р.
                                        </>
                                }
                            </span>

                            <div className={styles.order__btn_block}>
                                <button className={`${common.btn} ${styles.order__btn_add_to_cart}`}>Добавить в корзину</button>
                                <button className={`${common.btn} ${styles.order__btn_buy_by_click}`}>Купить в один клик</button>
                            </div>

                            <span>Наличие: {product.rest === 0 ? "нет в наличии" : "в наличии"}</span>
                        </div>
                    </div>
                </section>

                <section className={`${common.wrapper} ${styles.info}`}>
                    <nav className={styles.info__nav}>
                        <a onClick={this.tabsHandler} className={`${styles.info__nav_link} ${styles.info__nav_link__active}`} data-id="tab-features">Описание</a>
                        <a onClick={this.tabsHandler} className={styles.info__nav_link} data-id="tab-attributes">Характеристики</a>
                        <a onClick={this.tabsHandler} className={styles.info__nav_link} data-id="tab-delivery">Доставка и оплата</a>
                    </nav>

                    <div className={common.container}>
                        <Features promo={product.promoBlock}/>
                        <Specification specs={product.specifications}/>
                        <ProductDelivery/>
                    </div>
                </section>
                <PromoBadge/>
            </Layout>
        )
    }
}


// wrap in obj give you double invoke
function getProps(state) {
    return {
        db: state.db,
        cart: state.cart
    }
}


function setDispatch(dispatch) {
    return {
        onAddToCart: (evt, id, category) => {
            dispatch(actions.cart.disableButton(evt));
            dispatch(actions.cart.addItemAsync(evt, id, category))
        },
        onDeleteFromCart: (evt, id) => {
            dispatch(actions.cart.disableButton(evt));
            dispatch(actions.cart.removeItemAsync(evt, id))
        },
    }
}


export default connect(getProps, null)(Product);