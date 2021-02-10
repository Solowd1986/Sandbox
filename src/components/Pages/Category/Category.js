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
        this.categoryProducts = <BlockOverlay/>;
        this.state = {
            categoryProductsList: {}
        };
        this.props.fetchCategoryProducts(this.props.match.params.type);
    }

    componentDidMount() {
        window.scrollTo(0, 0); // always on top of page, without smooth scroll
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
            this.props.fetchCategoryProducts(this.props.match.params.type);
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryProducts: (category) => {
            dispatch(server.fetchCategoryProducts(category));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Category);



