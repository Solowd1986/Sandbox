import React, {Component} from "react";
import styles from "./order-summary.module.scss";

export default class OrderSummary extends Component {

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
        console.log(this.props.orderItems);

        return (
            <section className={styles.summary}>
                <h2 className={styles.caption}>Ваш заказ</h2>

                {this.props.orderItems.map(item => {
                    return (
                        <div key={item.title} className={styles.item}>
                            <div className={styles.info}>

                                {/*src={`img/${item.imgPath}`}*/}

                                <img className={styles.img_sm} src="img/oneplus_7pro-basket.png" alt="image"/>
                                <div className={styles.info_inner_wrapper}>
                                    <p className={styles.product_title}>{item.title}{item.color && item.color}</p>
                                </div>
                                <span className={styles.price__sm}>{item.price} р.</span>
                            </div>

                            <div className={styles.counter_block}>
                                <span onClick={this.inc} className={`${styles.counter} ${styles.counter_minus}`}/>
                                <label><input type="text" name="customer-product-count" onChange={this.changer} value={item.quantity}/></label>
                                <span onClick={this.dec} className={`${styles.counter} ${styles.counter_plus}`}/>
                            </div>
                        </div>
                    )
                })}


                <div className={styles.delivery_fieldset}>
                    <span className={styles.delivery_item}>Доставка по Москве:</span>
                    <span className={styles.delivery_item}>{this.calcTotal() > 50000 ? 0 : 400} р.</span>
                </div>

                <div className={styles.checkout}>
                    <span className={styles.delivery_item}>Итого:</span>
                    <span className={styles.price__lg}>{this.calcTotal() > 50000 ? this.calcTotal() : this.calcTotal() + 400} р.</span>
                </div>

                <button className={`btn ${styles.order_btn}`}>Оформить заказ</button>
            </section>

        )
    }
}


