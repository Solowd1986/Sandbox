import React, { Component } from "react";
//import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import { connect } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import Modal from "../../Core/Modal/Modal";
import CartModal from "../../Core/CartModal/CartModal";
import * as modal from "../../../redux/entities/modal/actions";
import * as PropTypes from "prop-types";

class Promo extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        index: PropTypes.object,
    };

    toggle = () => {
        this.props.enableModal();
    };


    render() {
        if (!this.props.index) return null;
        const { phones, accessoires, gadgets } = this.props.index;

        // const request = require('postman-request');
        //
        // for (let i = 10; i--;) {
        //     request('http://localhost:3000/api/category/phones', function (error, response, body) {
        //         console.log('error:', error); // Print the error if one occurred
        //         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //         //console.log('body:', body); // Print the HTML for the Google homepage.
        //     });
        // }


        return (
            <section className={`container ${styles.wrapper}`}>
                <main className={`wrapper ${styles.content}`}>

                    <button onClick={this.toggle}>Active</button>

                    {
                        this.props.isModalActive
                        &&
                        <Modal delay={true}>
                            <CartModal products={this.props.cart.products}/>
                        </Modal>
                    }

                    <h2 className={styles.section_title}>Рекомендуем</h2>
                    <ul className={styles.list}>
                        {phones.data.map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={phones.main}/>
                            )
                        })}
                    </ul>

                    <h2 className={styles.section_title}>Популярные гаджеты</h2>
                    <ul className={styles.list}>
                        {gadgets.data.map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={gadgets.main}/>
                            )
                        })}
                    </ul>

                    <h2 className={styles.section_title}>Аксессуары</h2>
                    <ul className={styles.list}>
                        {accessoires.data.map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={accessoires.main}/>
                            )
                        })}
                    </ul>
                </main>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        index: state.db.index,
        cart: state.cart,
        isModalActive: state.modal.isModalActive
    }
}

function mapDispatchToProps(dispatch) {
    return {
        enableModal: () => {
            dispatch(modal.enableModal());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Promo);

