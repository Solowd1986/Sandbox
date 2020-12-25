import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./category.module.scss";
import Layout from "~components/Core/Layout/Layout";
import {connect} from "react-redux";

import actions from "../../../redux/actions";
import SortPorducts from "../../Core/SortProducts/SortProducts";
import LazyLoad from "../../Core/LazyLoad/LazyLoad";
import ProductCard from "../ProductCart/ProductCard";
import OverlayComp from "../../Core/OverlayComp/OverlayComp";
import CartModal from "../../CartModal/CartModal";


class Category extends Component {

    // always on top of page, without smooth scroll
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const category = this.props.category.find(category => category.categoryAlias === this.props.match.params.type);

        return (
            <Layout>
                <div className={styles.category_wrapper}>
                    {
                        this.props.cart.modals.showModal && !this.props.cart.defaultSettings.buttonsDisabled
                        &&
                        <OverlayComp coloredBg={true} delay={false}>
                            <CartModal products={this.props.cart.products}/>
                        </OverlayComp>
                    }
                    <div className={styles.sign_bg}>
                        <img
                            className={styles.sign_bg__img}
                            src={`${category.imgPrefix}/${category.categoryTitleImg}`}
                            alt="Категории"/>
                        <h3 className={styles.sign_bg__title}>{category.categoryTitle}</h3>
                    </div>

                    <div className={common.wrapper}>
                        <SortPorducts/>
                    </div>

                    <div className={`${common.wrapper} ${styles.list_wrapper}`}>
                        <LazyLoad categoryName={category.categoryAlias}>
                            <ul className={styles.list}>
                                {Array.from(Array(2), (e, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            {category.productList.map((item, i) => {
                                                return (
                                                    <ProductCard key={i} item={item} category={category}/>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })}

                                {
                                    this.props.serverData.length > 0
                                    &&
                                    this.props.serverData.map((item, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <ProductCard key={i} item={item} category={category} classList={"animate__animated animate__fadeIn"}/>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </ul>
                        </LazyLoad>
                    </div>
                </div>
            </Layout>
        )
    }
}


const getState = (state) => {
    return {
        serverData: state.lazyload.serverStorageData,
        category: state.db.category,
        cart: state.cart
    }
};


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
        clearDataStorage: () => {
            dispatch(actions.lazyload.clearDataStorage());
        }
    }
}


export default connect(getState, setDispatch)(Category);



