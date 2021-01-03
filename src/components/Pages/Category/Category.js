import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./category.module.scss";
import Layout from "~components/Core/Layout/Layout";
import {connect} from "react-redux";

import actions from "../../../redux/actions";
import SortPorducts from "../../Core/SortProducts/SortProducts";
import LazyLoad from "../../Core/LazyLoad/LazyLoad";
import ProductCard from "../ProductCart/ProductCard";
import Overlay from "../../Core/Overlay/Overlay";
import CartModal from "../../CartModal/CartModal";



class Category extends Component {

    // always on top of page, without smooth scroll
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    // компонент один, поэтому скролл верх срабатывает при имплементации, а вот просы приходят на каждый клик
    // поэтому всегда происходит скролл вниз при переходе между категориями
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     window.scrollTo(0, window.pageYOffset + document.documentElement.clientHeight);
    // }

    createOverlay = () => {

        let OverlayElement = null;
        if (this.props.cart.modals.showModal && !this.props.cart.defaultSettings.buttonsDisabled) {
            OverlayElement = <Overlay coloredBg={true} delay={false}>
                <CartModal products={this.props.cart.products}/>
            </Overlay>
        }
        return OverlayElement;

    };

    lazyLoadPanel = (category) => {
        let lazyLoadData = null;
        if (this.props.serverData.length > 0) {
            lazyLoadData = this.props.serverData.map((item, i) => {
                return (
                    <React.Fragment key={i}>
                        <ProductCard key={i} item={item} category={category} classList={"animate__animated animate__fadeIn"}/>
                    </React.Fragment>
                )
            })
        }
        return lazyLoadData;
    };


    render() {
        const category = this.props.category.find(category => category.categoryAlias === this.props.match.params.type);
        let OverlayElement = this.createOverlay();
        let lazyLoadPanel = this.lazyLoadPanel(category);

        return (
            <Layout>
                {OverlayElement}

                <div className={styles.category_wrapper}>
                    <div className={styles.sign_bg}>
                        <img
                            className={`${styles.sign_bg__img} ${category.categoryAlias === "gadgets" && styles.img_fit}`}
                            src={`${category.imgPrefix}/${category.categoryTitleImg}`}
                            alt="Категории"/>
                        <h3 className={styles.sign_bg__title}>{category.categoryTitle}</h3>
                    </div>

                    <div className={common.wrapper}><SortPorducts/></div>

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

                                {/*блок подгружаемых с сервера товаров*/}
                                {lazyLoadPanel}
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



