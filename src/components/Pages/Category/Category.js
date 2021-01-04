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

    state = {
        filterType: ""
    };

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
            lazyLoadData = this.props.serverData.map((item) => {
                const key = Math.floor(Math.random() * 645665767812435);
                return (
                    <ProductCard key={key} item={item} category={category} classList={"animate__animated animate__fadeIn"}/>
                )
            })
        }
        return lazyLoadData;
    };


    changeFilter = (type) => {
        this.setState({
            filterType: type
        })
    };


    getProductsList = (category, additionalElements = []) => {
        const cloneDeep = require('lodash.clonedeep');
        const classListAnimation = "animate__animated animate__fadeIn";
        let list = cloneDeep([...category.productList, ...additionalElements]);

        switch (this.state.filterType) {
            case "popularity": {
                break;
            }
            case "priceLow": {
                list.sort((a, b) => a.price - b.price);
                break;
            }
            case "priceHigh": {
                list.sort((a, b) => b.price - a.price);
                break;
            }
            case "newest": {
                break;
            }
        }


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


    render() {
        // учти отсутвие значения в категории, если в URI пришли некорретнеы данные
        const category = this.props.category.find(category => category.categoryAlias === this.props.match.params.type);
        let OverlayElement = this.createOverlay();
        const productsList = this.getProductsList(category, this.props.serverData);

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

                    <div className={common.wrapper}><SortPorducts changeFilter={this.changeFilter}/></div>

                    <div className={`${common.wrapper} ${styles.list_wrapper}`}>
                        <LazyLoad categoryName={category.categoryAlias}>
                            <ul className={styles.list}>
                                {productsList}
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



