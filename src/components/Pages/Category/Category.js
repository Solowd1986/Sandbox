import React, { Component } from "react";
import common from "~scss/common.module.scss";
import styles from "./category.module.scss";
import Layout from "~components/Core/Layout/Layout";
import { connect } from "react-redux";

import * as server from "../../../redux/entities/db/actions";
import CategoryProductsList from "./CategoryProductsList";
import BlockOverlay from "../../Core/Modal/BlockOverlay/BlockOverlay";


class Category extends Component {
    constructor(props) {
        super(props);
        this.cnt = 0;
        this.cnt2 = 0;

        this.categoryProducts = <BlockOverlay/>;
        this.state = {
            categoryProductsList: {}
        };
        this.props.fetchCategoryProducts(this.props.match.params.type);
        this.flag = false;
    }

    componentDidMount() {
        window.scrollTo(0, 0); // always on top of page, without smooth scroll
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // проверяем текущий стейт, prev версию тут трогать нен уджно, для инициирующей првоерки она вредна
        const isThisInitialSetState = Object.keys(this.state.categoryProductsList).length === 0;

        const currentCategoryAlias = !isThisInitialSetState && this.state.categoryProductsList.main.alias;
        const nextCategoryAlias = !isThisInitialSetState && this.props.category.main.alias;

        const currentRoute = prevProps.match.params.type;
        const nextRoute = this.props.match.params.type;


        //this.flag = false;

        //document.body.style.cssText = `width: ${document.body.clientWidth}px; overflow: hidden`;
        //document.querySelector("header").style.cssText = `width: ${document.body.clientWidth}px`;


        if (isThisInitialSetState) {
            this.flag = true;
            console.log('first upd', this.cnt++);
            this.setState({
                categoryProductsList: this.props.category
            })
        }


        if (currentRoute !== nextRoute) {
            console.log('start');
            this.categoryProducts = <BlockOverlay/>;
            this.flag = false;
            // запрос не вызывает рендер, поэтому не показывается спиннер, тут мы посл запрсоа принуждаем рендер появиться
            // ну а дальше после прихода данных овтета, уже спиннер замениться на пропсы
            this.forceUpdate();
            this.props.fetchCategoryProducts(this.props.match.params.type);
        }


        // Такая проверка потому:
        // 1. isThisInitialSetState - проверяем, не первый ли это вход в компонент
        // 2. currentCategoryAlias - это alias для стейта, на основе него и рисуется содержимое
        // 3. Он не доложен быть равен руту следующему, который приходит по клику в пропсах
        // Еслии првоерку остановить тут, пока будет идти запрос на сервер, тут условие все еще будет выполняться
        /**
         * И это вызовет переполнение стека. Поэтому идет вторая проверка: алиас со стейта должен стать равен алиса с пропсов
         * ЭЭто укажет, что стейет был установлен по факту.
         * это сработает когда свреху заданный запрос спровоцирует оотвт и он придет, и вот этих просах пришедних алиас
         * не будет равен текущшему алис из стейт и это вызовет смену. А потмо еще раз суюда придем и в это условие
         * уже не попадем
         *
         */

        if (!isThisInitialSetState && currentCategoryAlias !== nextRoute && currentCategoryAlias !== nextCategoryAlias) {
            this.flag = true;
            console.log('end');

            this.setState({
                categoryProductsList: this.props.category
            })
        }
    }


    render() {
        console.log('rend');

        if (this.state.categoryProductsList.main !== undefined && this.flag === true) {
            const { main: category, data: products } = this.state.categoryProductsList;
            this.categoryProducts = <CategoryProductsList category={category} products={products}/>
        }

        return (
            <Layout>
                {this.categoryProducts}
            </Layout>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        category: state.db.category,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryProducts: (category) => {
            dispatch(server.fetchCategoryProducts(category));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Category);



