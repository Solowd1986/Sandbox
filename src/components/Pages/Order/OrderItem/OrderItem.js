import React, { Component } from "react";
import styles from "./order_item.module.scss"

class OrderItem extends Component {
    render() {
        const { item } = this.props;
        return (
            <div key={item.title} className={styles.item}>
                <div className={styles.info}>
                    <img
                        width={82} height={82} className={styles.img_sm}
                        // that from reducer addItemToCart
                        src={item.imgFullPath}
                        alt={item.imgAlt}
                    />
                    <div className={styles.info_inner_wrapper}>
                        <p className={styles.product_title}>
                            <span>{item.title}</span>
                            {item.specifications !== undefined && <span>({item.specifications.color})</span>}
                        </p>
                        <div className={styles.counter_block}>
                                        <span onClick={(evt) => this.changeAmountWithClick(evt, item.id, item.quantity - 1)}
                                              className={`${styles.counter} ${styles.counter_minus}`}/>

                            <label>
                                <input
                                    type="text" name="customer-product-count"
                                    onChange={(evt) => this.transitionalValueHandler(evt, item.id)}
                                    onBlur={(evt) => this.onBlurHandler(evt, item.id, evt.target.value)}
                                    value={this.state.orderedItems.find(citem => citem.id === item.id).quantity}
                                />
                            </label>

                            <span onClick={(evt) => this.changeAmountWithClick(evt, item.id, item.quantity + 1)}
                                  className={`${styles.counter} ${styles.counter_plus}`}/>
                        </div>
                    </div>
                    <span className={styles.price__sm}>
                                    {new Intl.NumberFormat().format(item.price * item.quantity)} р.</span>
                    <div>
                        <span className={styles.delete} onClick={(evt) => this.props.onDeleteProductFromCart(evt, item.id)}>&times;</span>
                    </div>
                </div>
            </div>

        )
    }
}

export default OrderItem;


