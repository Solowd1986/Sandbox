import React, { Component } from "react";
import styles from "./product.module.scss";
import cn from "classnames";

import ProductSlider from "./ProductSlider/ProductSlider";
import OrderButton from "../../Partials/OrderButton/OrderButton";
import ProductPrice from "../../Partials/ProductPrice/ProductPrice";
import ProductTabs from "./ProductTabs/ProductTabs";
import PromoBadge from "../../Partials/PromoBadge/PromoBadge";
import * as server from "../../../redux/entities/db/actions";

import { connect } from "react-redux";
import Spinner from "../../Partials/Spinner/Spinner";


class Product extends Component {

    state = {
        product: null
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.product && this.props.product) {
            this.setState({ product: this.props.product })
        }
    }

    componentDidMount() {
        this.props.fetchPageData(this.props);
    }

    render() {
        if (!this.state.product) return <Spinner/>;

        const { main: category, data: product } = this.state.product;
        console.log(product);

        const productPriceClassList = { main: `${styles.price}`, discount: `${styles.discount}` };
        const productAvailability = "Наличие: " + (product.rest === 0 ? "нет в наличии" : "в наличии");

        return (
            <>
                <section className={cn("container", styles.item_bg)}>
                    <div className={cn("wrapper", styles.order)}>
                        <ProductSlider list={product.slider} alt={product.img_alt}/>
                        <div className={styles.order__info_wrapper}>
                            <h1 className={styles.order__title}>{product.title}</h1>
                            <p className={styles.order__desc}>{product.desc}</p>
                            <ProductPrice product={product} classList={productPriceClassList}/>

                            <div className={styles.btn_wrapper}>
                                <OrderButton product={product} classList={styles.btn_order}/>
                            </div>
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
        product: state.db.product,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPageData: (params) => {
            dispatch(server.fetchPageData(params));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
