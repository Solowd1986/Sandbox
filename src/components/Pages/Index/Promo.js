import React, { Component } from "react";
//import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import { connect } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import Modal from "../../Core/Modal/Modal";
import CartModal from "../../Core/CartModal/CartModal";
import * as modal from "../../../redux/entities/modal/actions";
import * as PropTypes from "prop-types";
import * as server from "../../../redux/entities/db/actions";
import Spinner from "../../Core/Modal/Spinner/Spinner";

class Promo extends Component {
    constructor(props) {
        super(props);
        console.log('const');

        this.props.getData();
    }


    static propTypes = {
        index: PropTypes.object,
    };


    toggle = () => {
        this.props.enableModal();
    };


    render() {
        //console.log('no promo');

        if (!this.props.index) return <div className={styles.spin_wrap}><Spinner/></div>;

        const { phones, accessoires, gadgets } = this.props.index;

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
        },
        getData: () => {
            dispatch(server.getData());
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Promo);

