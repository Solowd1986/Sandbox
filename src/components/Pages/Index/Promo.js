import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import {connect} from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import Modal from "../../Core/Modal/Modal";
import CartModal from "../../CartModal/CartModal";

import { requestIndexData } from "../../../redux/middlware/requestToServer";
import * as modalActions from "../../../redux/entities/modal/actions";

import PropTypes from "prop-types";


class Promo extends Component {

    static propTypes = {
        category: PropTypes.array,
    };

    toggle = () => {
        this.props.enableModal();
    };

    render() {
        const { phones, accessoires, gadgets } = this.props.index;

        return (
            <section className={`${common.container} ${styles.promo_wrapper}`}>
                <main className={`${common.wrapper} ${styles.promo}`}>
                    <button onClick={this.toggle}>Active</button>

                    {
                        this.props.isModalActive
                        &&
                        <Modal delay={true}>
                            <CartModal products={this.props.cart.products}/>
                        </Modal>
                    }

                    <h2 className={styles.promo_section_title}>Рекомендуем</h2>
                    <ul className={styles.promo_list}>
                        {/*ограничиваем вывод четырьмя элементами на странице promo*/}
                        {phones.slice(0, 4).map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={phones}/>
                            )
                        })}
                    </ul>


                    <h2 className={styles.promo_section_title}>Популярные гаджеты</h2>
                    <ul className={styles.promo_list}>
                        {gadgets.slice(0, 4).map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={gadgets}/>
                            )
                        })}
                    </ul>


                    <h2 className={styles.promo_section_title}>Аксессуары</h2>
                    <ul className={styles.promo_list}>
                        {accessoires.slice(0, 4).map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={accessoires}/>
                            )
                        })}
                    </ul>
                </main>
            </section>
        )
    }
}



// wrap in obj give you double invoke
function mapStateToProps(state) {
    return {
        state,
        // index: state.db.indexPageProducts,
        index: state.db.index,
        cart: state.cart,
        isModalActive: state.modal.isModalActive
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getData: () => {
            dispatch(requestIndexData());
        },
        enableModal: () => {
            dispatch(modalActions.enableModal());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Promo);

