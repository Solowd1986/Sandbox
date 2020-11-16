import React, {Component} from "react";
import styles from "./order-summary.module.scss";
import {connect} from "react-redux";

class OrderSummary extends Component {

    static defaultProps = {
        orderItems: []
    };

    changer = () => {
    };
    inc = () => {

    };

    dec = () => {

    };

    calcTotal = () => {
        return this.props.orderItems.reduce((total, item) => {
            total += (item.price * item.quantity);
            return total;
        }, 0);
    };

    render() {
        //console.log(this.props.orderItems);

        return (
            <section className={styles.summary}>
                <h2 className={styles.caption}>Ваш заказ</h2>

                {this.props.orderItems.map(item => {
                    return (
                        <div key={item.title} className={styles.item}>
                            <div className={styles.info}>
                                {/*src={`img/${item.imgPath}`}*/}

                                <img width={82} height={82} className={styles.img_sm} src="static/media/phones/oneplus_3_6gb_64gb_grey/oneplus_3_6gb_64gb_grey_275_1.png"
                                     alt="image"/>
                                <div className={styles.info_inner_wrapper}>
                                    <p className={styles.product_title}>
                                        <span>{item.title}</span>
                                        {item.color && <span>{item.color}</span>}
                                    </p>
                                    <div className={styles.counter_block}>
                                        <span onClick={() => this.props.productDecrease(item.id)} className={`${styles.counter} ${styles.counter_minus}`}/>
                                        <label><input type="text" name="customer-product-count" onChange={this.changer} value={item.quantity}/></label>
                                        <span onClick={() => this.props.productIncrease(item.id)} className={`${styles.counter} ${styles.counter_plus}`}/>
                                    </div>
                                </div>
                                <span className={styles.price__sm}>{item.price * item.quantity} р.</span>
                                <div>
                                    <span className={styles.delete} onClick={() => this.props.productDelete(item.id)}>&times;</span>
                                </div>
                            </div>

                        </div>
                    )
                })}


                <div className={styles.delivery_fieldset}>
                    <span className={styles.delivery_item}>Доставка по Москве:</span>
                    <span className={styles.delivery_item}>{this.calcTotal() > 100000 ? 0 : 400} р.</span>
                </div>

                <div className={styles.checkout}>
                    <span className={styles.delivery_item}>Итого:</span>
                    <span className={styles.price__lg}>{this.calcTotal() > 100000 ? this.calcTotal() : this.calcTotal() + 400} р.</span>
                </div>

                <button className={`btn ${styles.order_btn}`}>Оформить заказ</button>
            </section>

        )
    }
}


function getProps(state) {
    return state
}


function setDispatch(dispatch) {
    return {
        productIncrease: (id) => {
            dispatch({ type: "ORDER_ITEM_INC", id });
        },
        productDecrease: (id) => {
            dispatch({ type: "ORDER_ITEM_DEC", id });
        },
        productDelete: (id) => {
            dispatch({ type: "ORDER_ITEM_DELETE", id });
        }
    }
}


export default connect(getProps, setDispatch)(OrderSummary);