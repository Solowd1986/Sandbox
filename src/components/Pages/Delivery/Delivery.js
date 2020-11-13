import React from "react";
import common from "~scss/common.module.scss";
import styles from "./delivery.module.scss";
import Layout from "../../Core/Layout/Layout";

const Delivery = props => {
    return (
        <Layout>
            <div className={common.wrapper}>
                <h1>Delivery</h1>
                {props.children}
            </div>
        </Layout>
    )
};

export default Delivery;
