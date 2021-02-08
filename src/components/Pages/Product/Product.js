import React, { Component } from "react";
import common from "~scss/common.module.scss";
import styles from "./product.module.scss";
import classNames from "classnames";

import Layout from "~components/Core/Layout/Layout";
import ProductSlider from "./ProductSlider/ProductSlider";
import OrderButton from "../../Core/OrderButton/OrderButton";
import ProductPrice from "../../Core/ProductPrice/ProductPrice";
import ProductTabs from "./ProductTabs/ProductTabs";
import PromoBadge from "../../Core/PromoBadge/PromoBadge";
import * as cart from "../../../redux/entities/cart/actions";

import { connect } from "react-redux";


class Product extends Component {

    componentDidMount() {
        window.scrollTo(0, 0); // always on top of page
    }

    isProductInCart = (products, id) => products.find(item => item.id === id);

    render() {
        const id = parseInt(this.props.match.params.id);
        const category = this.props.db.category.find(item => item.categoryAlias === this.props.match.params.category);
        const product = this.props.db.category.find(item => item.categoryAlias === category.categoryAlias).productList.find(item => item.id === id);

        const prefix = category.imgPrefix;
        const list = product.imgPath.lg;
        const alt = product.imgAlt;

        const productPriceClassList = { main: `${styles.price}`, discount: `${styles.discount}` };
        const productAvailability = "Наличие: " + (product.rest === 0 ? "нет в наличии" : "в наличии");

        let orderButton = null;
        const onDeleteFromCart = (evt) => {
            this.props.onDeleteFromCart(evt, product.id);
        };
        const onAddToCart = (evt) => {
            this.props.onAddToCart(evt, product.id, category);
        };
        if (this.isProductInCart(this.props.cart.products, product.id)) {
            orderButton =
                <div className={styles.btn_block}>
                    <OrderButton
                        product={product}
                        classList={styles.remove_from_cart}
                        onClick={onDeleteFromCart}>
                        Убрать из заказа
                    </OrderButton>
                </div>;
        } else {
            const isButtonDisabled = product.rest === 0;
            const classList = classNames(styles.add_to_cart, {
                [styles.remove_from_cart]: product.rest === 0
            });
            orderButton =
                <div className={styles.btn_block}>
                    <OrderButton
                        product={product}
                        classList={classList}
                        onClick={onAddToCart}>
                        Добавить в заказ
                    </OrderButton>
                </div>;
        }

        return (
            <Layout>
                <section className={`${common.container} ${styles.item_bg}`}>
                    <div className={`${common.wrapper} ${styles.order}`}>
                        <ProductSlider prefix={prefix} list={list} alt={alt}/>

                        <div className={styles.order__info_wrapper}>
                            <h1 className={styles.order__title}>{product.title}</h1>
                            <p className={styles.order__desc}>{product.desc}</p>
                            <ProductPrice product={product} classList={productPriceClassList}/>
                            {orderButton}
                            <span>{productAvailability}</span>
                        </div>
                    </div>
                </section>
                <ProductTabs category={category} product={product}/>
                <PromoBadge/>
            </Layout>
        )
    }
}


function mapStateToProps(state) {
    return {
        db: state.db,
        cart: state.cart
    }
}


function mapDispatchToProps(dispatch) {
    return {
        onAddToCart: (evt, id, category) => {
            dispatch(cart.addItemToCart(evt, id, category))
        },
        onDeleteFromCart: (evt, id) => {
            dispatch(cart.removeItemFromCart(evt, id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
