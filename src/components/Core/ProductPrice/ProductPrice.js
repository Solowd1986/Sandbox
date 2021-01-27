import React from "react";
import common from "~scss/common.module.scss";
import styles from "./product-price.module.scss";
import {connect} from "react-redux";


const ProductPrice = props => {
    return (
        <span className={props.classList.main}>
            {
                props.product.rest === 0 || !props.product.discount
                    ?
                    <>
                        {new Intl.NumberFormat().format(props.product.price)} р.
                    </>
                    :
                    <>
                        <span className={props.classList.discount}>{new Intl.NumberFormat().format(props.product.price)} р.</span>
                        {new Intl.NumberFormat().format(props.product.price - (props.product.price * 10 / 100))} р.
                    </>
            }
        </span>

    )
};


function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps)(ProductPrice);









