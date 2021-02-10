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
import CategoryProductsList from "./CategoryProductsList";


class Category extends Component {

    constructor(props) {
        super(props);
        this.categoryProducts = null;
        this.state = {
            categoryProductsList: {}
        };
        this.props.getData(this.props.match.params.type);
    }

    componentDidMount() {
        window.scrollTo(0, 0); // always on top of page, without smooth scroll
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const currentRoute = this.state.categoryProductsList.main && this.state.categoryProductsList.main.alias;
        const nextRoute = nextProps.match.params.type;

        return currentRoute !== nextRoute;
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const isThisInitialSetState = Object.keys(prevState.categoryProductsList).length === 0;

        const currentCategoryAlias = !isThisInitialSetState && this.state.categoryProductsList.main.alias;
        const nextCategoryAlias = !isThisInitialSetState && this.props.category.main.alias;

        const currentRoute = prevProps.match.params.type;
        const nextRoute = this.props.match.params.type;

        if (isThisInitialSetState) {
            this.setState({
                categoryProductsList: this.props.category
            })
        }

        if (!isThisInitialSetState && currentCategoryAlias !== nextRoute && currentCategoryAlias !== nextCategoryAlias) {
            this.setState({
                categoryProductsList: this.props.category
            })
        }

        if (currentRoute !== nextRoute) {
            this.props.getData(this.props.match.params.type);
        }
    }


    render() {
        if (this.state.categoryProductsList.main !== undefined) {
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


const loadAxios = (category) => (dispatch) => {
    console.log('request');
    api.get(`category/${category}`)
        .then(responce => dispatch({ type: "server/getCategoryData", payload: responce.data }))
        .catch(error => dispatch({ type: "server/serverError", payload: error }))
};


const mapDispatchToProps = (dispatch) => {
    return {
        getData: (category) => {
            dispatch(loadAxios(category));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Category);



