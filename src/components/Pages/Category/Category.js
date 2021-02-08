import React, { Component } from "react";
import common from "~scss/common.module.scss";
import styles from "./category.module.scss";
import Layout from "~components/Core/Layout/Layout";
import { connect } from "react-redux";


import SortPorducts from "../../Core/SortProducts/SortProducts";
import LazyLoad from "../../Core/LazyLoad/LazyLoad";
import ProductCard from "../ProductCard/ProductCard";
import Modal from "../../Core/Modal/Modal";
import CartModal from "../../CartModal/CartModal";
import PropTypes from "prop-types";
import { Transition, TransitionGroup } from "react-transition-group";

import api from "../../../redux/api/axios/init";
import { requestIndexData } from "../../../redux/middlware/requestToServer";
import * as modalActions from "../../../redux/entities/modal/actions";

class Category extends Component {


    static defaultProps = {
        category: {
            main: {
                img: {}
            },
            data: [],
        },

    };


    // компонент один, поэтому скролл верх срабатывает при имплементации, а вот просы приходят на каждый клик
    // поэтому всегда происходит скролл вниз при переходе между категориями
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     window.scrollTo(0, window.pageYOffset + document.documentElement.clientHeight);
    // }

    createOverlay = () => {

        let OverlayElement = null;
        if (this.props.cart.modals.showModal
            &&
            !this.props.cart.defaultSettings.buttonsDisabled
            &&
            !this.props.cart.modals.isOfferGoToCartBeenShown) {
            OverlayElement = <Overlay coloredBg={true} delay={false}>
                <CartModal products={this.props.cart.products}/>
            </Overlay>
        }
        return OverlayElement;
    };

    lazyLoadPanel = (category) => {
        let lazyLoadData = null;
        if (this.props.serverData.length > 0) {
            lazyLoadData = this.props.serverData.map((item) => {
                const key = Math.floor(Math.random() * 645665767812435);
                return (
                    <ProductCard key={key} item={item} category={category} classList={"animate__animated animate__fadeIn"}/>
                )
            })
        }
        return lazyLoadData;
    };



    getProductsList = (category, additionalElements = []) => {
        const cloneDeep = require('lodash.clonedeep');
        const classListAnimation = "animate__animated animate__fadeIn";
        let list = cloneDeep([...category.productList, ...additionalElements]);

        /**
         * Начальный набор элементов фиксирован, сейчас - 4 штуки. Дальнейшее расширение идет за счет разрастающегося
         * за счет lazyLoad массива serverData, он же additionalElements и его длина растет при каждом клике на кнопку.
         * Начальных элементов 4, и мы всегда прибавляем по 4 к добавочному массиву: +4, +8, +12 и так далее.
         * Ход такой: 4 элемента есть, 0 пришло - 4 элемента анимированы. 4 есть, 4 пришло, их длина 4 - с 4 индекса анимация,
         * 4 есть, 8 пришло, длина 8: с 8 индекса анимация. Из-за этих четверок и исходных имеющихся мы всегда имеем больше на
         * 4 элемента, чем пришло от lazyLoad, поэтому, отправная точка для анимации всегда максимальная длина list - 4
         * Если бы изначальных 4 элементов не было, то индекс анимации начинался бы с несуществующего элемента, так как length
         * это last index + 1, но тут общее количество всегда на 4 больше, чем пришло от lazyLoad, а значит, длина приходящего
         * массива служит отправной точкой для анимации последних 4-х элементов.
         */
        return list.map((item, i) => {
            const key = Math.floor(Math.random() * 56123473446);
            let classList = null;
            if (i >= category.productList.length && i >= additionalElements.length) {
                classList = classListAnimation;
            }
            return (
                <ProductCard key={key} item={item} category={category} classList={classList}/>
            )
        });
    };

    // always on top of page, without smooth scroll
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getData(this.props.match.params.type = "phones");

        //console.log('rr', this.props.match.params.type);
    }

    render() {
        //console.log(this.props);

        const { main: category, data: products } = this.props.category;

        return (
            <Layout>
                {/*{OverlayElement}*/}

                <div className={styles.category_wrapper}>
                    <div className={styles.sign_bg}>
                        <img
                            className={`${styles.sign_bg__img} ${category.alias === "gadgets" && styles.img_fit}`}
                            src={category.img.path}
                            alt={category.img.alt}/>
                        <h3 className={styles.sign_bg__title}>{category.title}</h3>
                    </div>

                    <div className={`${common.wrapper} ${styles.filters_wrapper}`}>
                        <SortPorducts changeFilter={this.changeFilter}/>
                    </div>

                    <div className={`${common.wrapper} ${styles.list_wrapper}`}>
                        <LazyLoad categoryName={category.categoryAlias}>
                            <ul className={styles.list}>

                                {/*{productsList}*/}

                                {
                                    products.map((item, i) => {
                                        return (<div key={i}>
                                            {item.title}
                                        </div>)
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


const mapStateToProps = (state) => {
    return {
        category: state.db.category,
    }
};


const loadAxios = (category) => (dispatch) => {
    api.get(`category/${category}`)
        .then(responce => dispatch({ type: "server/getCategoryData", payload: responce.data }))
        .catch(error => dispatch({ type: "server/serverError", payload: error }))
};


function mapDispatchToProps(dispatch) {
    return {
        getData: (category) => {
            dispatch(loadAxios(category));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);



