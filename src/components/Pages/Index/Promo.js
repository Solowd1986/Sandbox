import React, {Component} from "react";
import common from "~scss/common.module.scss";
import styles from "./promo.module.scss";
import {connect} from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import Overlay from "../../Core/Overlay/Overlay";
import CartModal from "../../CartModal/CartModal";
import PropTypes from "prop-types";


class Promo extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.getData();
    }

    // static propTypes = {
    //     category: PropTypes.array,
    // };

    state = {
        toggle: false
    };

    toggle = () => {
        this.props.enableModal();
    };

    getIndexItems = () => {
        const axios = require('axios').default;

        if (!this.data) {
            axios.get('/api/index')
                .then((response) => {
                    // handle success
                    this.data = response;
                    //console.log("responce", response);
                }).catch((error) => {
                //console.log("Axios Error - ", error);
            }).then(function () {
                // always executed
            });
        }
    };

    render() {
        //console.log(this.props);
        const [phones, accessoires, gadgets] = this.props.db.category;


        //console.log('res', this.props.db.loader);

        const modalToggle =
            this.props.cart.modals.showModal &&
            !this.props.cart.defaultSettings.buttonsDisabled &&
            !this.props.cart.modals.isOfferGoToCartBeenShown;


        return (
            <section className={`${common.container} ${styles.promo_wrapper}`}>
                <main className={`${common.wrapper} ${styles.promo}`}>

                    <button onClick={this.toggle}>Active</button>

                    {
                        modalToggle &&
                        <Overlay bg={true} delay={false}>
                            <CartModal products={this.props.cart.products}/>
                        </Overlay>
                    }

                    {
                        this.props.isModalActive
                        &&
                        <Overlay bg={true} delay={true}>
                            <CartModal products={this.props.cart.products}/>
                        </Overlay>
                    }

                    <h2 className={styles.promo_section_title}>Рекомендуем</h2>
                    <ul className={styles.promo_list}>
                        {/*ограничиваем вывод четырьмя элементами на странице promo*/}
                        {phones.productList.slice(0, 4).map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={phones}/>
                            )
                        })}
                    </ul>

                    <h2 className={styles.promo_section_title}>Популярные гаджеты</h2>

                    <ul className={styles.promo_list}>
                        {gadgets.productList.slice(0, 4).map((item, i) => {
                            return (
                                <ProductCard key={i} item={item} category={gadgets}/>
                            )
                        })}
                    </ul>


                    <h2 className={styles.promo_section_title}>Аксессуары</h2>
                    <ul className={styles.promo_list}>
                        {accessoires.productList.slice(0, 4).map((item, i) => {
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


import { requestIndexData } from "../../../redux/middlware/requestToServer";
import * as modalActions from "../../../redux/entities/modal/actions";

// wrap in obj give you double invoke
function mapStateToProps(state) {
    return {
        db: state.db,
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

