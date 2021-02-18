import React, { Component } from "react";
import common from "~scss/common.module.scss";
import styles from "./product.module.scss";
import classNames from "classnames";

import ProductSlider from "./ProductSlider/ProductSlider";
import OrderButton from "../../Core/OrderButton/OrderButton";
import ProductPrice from "../../Core/ProductPrice/ProductPrice";
import ProductTabs from "./ProductTabs/ProductTabs";
import PromoBadge from "../../Core/PromoBadge/PromoBadge";
import * as cart from "../../../redux/entities/cart/actions";
import * as server from "../../../redux/entities/db/actions";

import { connect } from "react-redux";
import Spinner from "../../Core/Modal/Spinner/Spinner";


class Product extends Component {

    state = {
        product: null
    };

    isProductInCart = (products, id) => products.find(item => item.id === id);

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.product && this.props.product) {
            this.setState({ product: this.props.product })
        }
    }

    componentDidMount() {
        this.props.fetchPageData(this.props);
    }

    componentWillUnmount() {
        this.setState({ product: null })
    }

    render() {
        if (!this.state.product) return <Spinner/>;

        const { main: category, data: product } = this.state.product;


        const productPriceClassList = { main: `${styles.price}`, discount: `${styles.discount}` };
        const productAvailability = "Наличие: " + (product.rest === 0 ? "нет в наличии" : "в наличии");

        let orderButton = null;

        const onDeleteFromCart = (evt) => {
            this.props.onDeleteFromCart(evt, product.id);
        };

        const onAddToCart = (evt) => {
            this.props.onAddToCart(evt, product);
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
                        {product.rest !== 0 ? "Добавить в заказ" : "Нет в наличии"}
                    </OrderButton>
                </div>;
        }

        return (
            <>
                <section className={`${common.container} ${styles.item_bg}`}>
                    <div className={`${common.wrapper} ${styles.order}`}>
                        <ProductSlider list={product.slider} alt={product.img_alt}/>

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
            </>
        )
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cart,
        product: state.db.product,
    }
}


function mapDispatchToProps(dispatch) {
    return {

        onAddToCart: (evt, item) => {
            dispatch(cart.addItemToCart(evt, item))
        },
        onDeleteFromCart: (evt, id) => {
            dispatch(cart.removeItemFromCart(evt, id))
        },
        fetchPageData: (params) => {
            dispatch(server.fetchPageData(params));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
