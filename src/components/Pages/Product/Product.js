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


class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: {}
        };
        this.props.fetchProductData(this.props.match.params.category, this.props.match.params.id);
    }

    componentDidMount() {
        //window.scrollTo(0, 0); // always on top of page
    }

    componentWillUnmount() {
        this.props.clearProduct();
    }

    isProductInCart = (products, id) => products.find(item => item.id === id);

    render() {

        console.log(this.props);
        if (!this.props.product || Object.keys(this.props.product).length === 0) return null;

        const { main: category, data: product } = this.props.product;

        //console.log(product);
        //console.log(category);


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
        db: state.db,
        cart: state.cart,
        product: state.db.product
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
        clearProduct: (evt, id) => {
            dispatch(server.clearProduct())
        },
        fetchProductData: (category, id) => {
            dispatch(server.fetchProductData(category, id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
