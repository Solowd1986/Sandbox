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
import classNames from "classnames";


// class Bond extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }

// static getDerivedStateFromError(error) {
//     console.log('ee', error);
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
// }
//
// componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service
//     //logErrorToMyService(error, errorInfo);
//     //debugger;
//     console.dir(error);
//     console.dir(errorInfo);
//     console.log('INNER Bound Error');
// }


//     render() {
//         if (this.state.hasError) {
//             // You can render any custom fallback UI
//             return <h1>ERRRORRR</h1>
//         }
//         return this.props.children;
//     }
// }
//
//
// class B2 extends Component {
//
//     componentDidMount() {
//         this.setS1tate({name: 12});
//     }
//
//
//     render() {
//         return (
//             <h4>AAAAA</h4>
//         )
//     }
// }








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

    componentDidCatch(error, errorInfo) {
        console.dir(errorInfo.componentStack);
        console.dir(error);
    }

    render() {

        if (!this.state.index) return <div className={styles.spin_wrap}><Spinner/></div>;
        const { phones, accessoires, gadgets } = this.state.index;

        return (

            <section className={`container ${styles.wrapper}`}>
                <main className={`wrapper ${styles.content}`}>

                    {/*<Tabs/>*/}
                    {/*<SliderLIne/>*/}

                    {/*<Bond>*/}
                    {/*    <B2>AA</B2>*/}
                    {/*</Bond>*/}


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
        fetchPageData: (params) => {
            dispatch(server.fetchPageData(params));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Promo);

