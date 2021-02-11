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
        this.state = {
            categoryProductsList: {}
        };
        this.props.fetchCategoryProducts(this.props.match.params.type);
    }

    componentDidMount() {
        window.scrollTo(0, 0); // always on top of page, without smooth scroll
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('did update');

        const isThisInitialSetState = Object.keys(this.state.categoryProductsList).length === 0;

        const currentCategoryAlias = !isThisInitialSetState && this.state.categoryProductsList.main.alias;
        const nextCategoryAlias = !isThisInitialSetState && this.props.category.main.alias;

        const currentRoute = prevProps.match.params.type;
        const nextRoute = this.props.match.params.type;


        if (isThisInitialSetState) {
            this.setState({
                categoryProductsList: this.props.category
            })
        }

        if (currentRoute !== nextRoute) {
            this.props.fetchCategoryProducts(nextRoute);
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

        if (currentCategoryAlias !== nextRoute && currentCategoryAlias !== nextCategoryAlias) {
            this.setState({
                categoryProductsList: this.props.category
            })
        }
    }

    render() {
        console.log('rend');
        const isProductsListEmpty = Object.keys(this.state.categoryProductsList).length === 0;

        const list = this.state.categoryProductsList;

        if (isProductsListEmpty || list.main && list.main.alias !== this.props.match.params.type) {
            this.categoryProducts = <BlockOverlay/>;
        } else {
            const { main: category, data: products } = this.state.categoryProductsList;
            this.categoryProducts = <CategoryProductsList category={category} products={products}/>;
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



