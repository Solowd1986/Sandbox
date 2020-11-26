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
import OrderButton from "../../Core/OrderButton/OrderButton";
import ProductPrice from "../../Core/ProductPrice/ProductPrice";


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
        window.scrollTo(0, 0);


    }

    isProductInCart = (products, id) => products.find(item => item.id === id);

    render() {

        //console.log(this.props);
        
        const id = parseInt(this.props.match.params.id);
        const category = this.props.db.category.find(item => item.categoryAlias === this.props.match.params.category);
        const product = this.props.db.category.find(item => item.categoryAlias === category.categoryAlias).productList.find(item => item.id === id);

        //console.log(category);
        //console.log(product);

        return (
            <Layout>
                <section className={`${common.container} ${styles.item_bg}`}>
                    <div className={`${common.wrapper} ${styles.order}`}>

                        <div className={styles.order__img_wrapper}>
                            <img
                                className={styles.order__img}
                                src={`${category.imgPrefix}/${category.categoryAlias}/${product.imgPath.lg[0]}`}
                                alt={product.imgAlt}
                            />
                            <div className={styles.order__slider}>
                                <img className="" width="60" height="60"
                                     src={`${category.imgPrefix}/${category.categoryAlias}/${product.imgPath.lg[1]}`}
                                     alt={product.imgAlt}
                                />
                                <img className="" width="60" height="60"
                                     src={`${category.imgPrefix}/${category.categoryAlias}/${product.imgPath.lg[2]}`}
                                     alt={product.imgAlt}
                                />
                            </div>
                        </div>

                        <div className={styles.order__info_wrapper}>
                            <h1 className={styles.order__title}>{product.title}</h1>
                            <p className={styles.order__desc}>
                                {product.desc && product.desc}
                            </p>

                            <ProductPrice product={product} classList={{ main: `${styles.order__price}`, discount: `${styles.order__price__discount}` }}/>

                            <div className={styles.order__btn_block}>
                                {
                                    this.isProductInCart(this.props.cart.products, product.id)
                                        ?
                                        <>
                                            <OrderButton
                                                product={product}
                                                classList={styles.order__btn_add_to_cart}
                                                onClick={(evt) => this.props.onDeleteFromCart(evt, product.id)}>
                                                Убрать из заказа
                                            </OrderButton>

                                            <OrderButton
                                                product={product}
                                                classList={styles.order__btn_buy_by_click}
                                                onClick={(evt) => this.props.onAddToCart(evt, product.id, category)}>
                                                {product.rest === 0 ? "Нет в наличии" : "Купить в один клик"}
                                            </OrderButton>
                                        </>

                                        :

                                        <>
                                            <OrderButton
                                                product={product}
                                                classList={`${styles.order__btn_add_to_cart} ${styles.order_btn_img}`}
                                                onClick={(evt) => this.props.onAddToCart(evt, product.id, category)}>
                                                {product.rest === 0 ? "Нет в наличии" : "Добавить в заказ"}
                                            </OrderButton>

                                            {
                                                product.rest !== 0
                                                &&
                                                <OrderButton
                                                    product={product}
                                                    classList={styles.order__btn_buy_by_click}
                                                    onClick={(evt) => this.props.onAddToCart(evt, product.id, category)}>
                                                    {product.rest === 0 ? "Нет в наличии" : "Купить в один клик"}
                                                </OrderButton>
                                            }
                                        </>
                                }
                            </div>
                            <span>Наличие: {product.rest === 0 ? "нет в наличии" : "в наличии"}</span>
                        </div>
                    </div>
                </section>

                <section className={`${common.wrapper} ${styles.info}`}>
                    <nav className={styles.info__nav}>
                        <a onClick={this.tabsHandler} className={`${styles.info__nav_link} ${styles.info__nav_link__active}`} data-id="tab-features">Описание</a>
                        {category.categoryAlias === "phones" && <a onClick={this.tabsHandler} className={styles.info__nav_link} data-id="tab-attributes">Характеристики</a>}
                        <a onClick={this.tabsHandler} className={styles.info__nav_link} data-id="tab-delivery">Доставка и оплата</a>
                    </nav>

                    <div className={common.container}>
                        <Features imgPrefix={`${category.imgPrefix}/${category.categoryAlias}`} promo={product.promoBlock}/>
                        {category.categoryAlias === "phones" && <Specification specs={product.specifications}/>}
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


export default connect(getProps, setDispatch)(Product);