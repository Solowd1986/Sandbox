import React, { Component } from "react";

import styles from "./promo.module.scss";
import classNames from "classnames";
import * as PropTypes from "prop-types";

import ProductCard from "@components/Partials/ProductCard/ProductCard";
import Modal from "@components/Partials/Modal/Modal";
import Spinner from "@components/Partials/Modal/Spinner/Spinner";
import CartModal from "@components/Other/CartModal/CartModal";

import * as cartSelector from "@redux/entities/cart/selectors/cartSelectors";
import * as modalSelectors from "@redux/entities/modal/selectors/modalSelector";

import * as modalActions from "@redux/entities/modal/actions";
import * as serverActions from "@redux/entities/db/actions";
import { connect } from "react-redux";


import FormikForm from "../../Other/Form/Formik/FormikForm";


import { NavLink } from "react-router-dom";
import { Map } from "immutable";
import DataStore from "../../Test/DataStore";

import Stores from "../../Test/Stores"


class Promo extends Component {
    state = {
        index: null
    };

    static propTypes = {
        index: PropTypes.object,
    };

    toggle = () => {
        this.props.enableModal();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.index && this.props.index) {
            this.setState({ index: this.props.index })
        }
    }

    componentDidMount() {
        this.props.fetchPageData(this.props);
    }


    componentWillUnmount() {
        this.setState(state => ({ index: null }));
    }


    render() {
        //console.log(this.props);

        if (!this.state.index) return <div className={styles.spin_wrap}><Spinner/></div>;
        const { phones, accessoires, gadgets } = this.state.index;

        const list = new Map({
            public: true,
            ages: [
                { age: 12 },
                { age: 14 },
                { age: 15 },
            ]
        });

        const list2 = list.get("ages").push({ age: 21 });
        console.log(list2);

        console.log(list2 === list);


        //const res = list.set("name", [...list.name, {age: 22}]);
        //const res = [...list.name, {age: 22}];
        //console.dir(list);
        //console.dir(res);
        //console.log(list res);


        return (
            <section className={`container ${styles.wrapper}`}>
                <main className={`wrapper ${styles.content}`}>
                    <NavLink to={"/secret"}>Go to secret page </NavLink>
                    <NavLink to={"/login"}>Go to login page </NavLink>

                    {/*<FormikForm/>*/}

                    {/*<MyForm/>*/}

                    {/*<DataStore data={12}/>*/}

                    {/*<Stores/>*/}


                    {/*<button onClick={this.toggle}>Active</button>*/}
                    {
                        this.props.isModalActive
                        &&
                        <Modal delay={true}>
                            <CartModal products={this.props.cart.products}/>
                        </Modal>
                    }

                    <h2 className={styles.section_title}>Рекомендуем</h2>
                    <ul className={styles.list}>
                        {phones.data.map((item, i) => <ProductCard key={i} item={item} category={phones.main}/>)}
                    </ul>

                    <h2 className={styles.section_title}>Популярные гаджеты</h2>
                    <ul className={styles.list}>
                        {gadgets.data.map((item, i) => <ProductCard key={i} item={item} category={gadgets.main}/>)}
                    </ul>

                    <h2 className={styles.section_title}>Аксессуары</h2>
                    <ul className={styles.list}>
                        {accessoires.data.map((item, i) => <ProductCard key={i} item={item} category={accessoires.main}/>)}
                    </ul>
                </main>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        index: state.db.index,
        cart: cartSelector.cartStateSelector(state),
        isModalActive: modalSelectors.modalStatusSelector(state)
    }
}


function mapDispatchToProps(dispatch) {
    return {
        enableModal: () => {
            dispatch(modalActions.enableModal());
        },
        fetchPageData: (params) => {
            dispatch(serverActions.fetchPageData(params));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Promo);

