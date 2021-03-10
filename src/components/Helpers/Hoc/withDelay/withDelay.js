import React, { Component } from "react";
import styles from "./with-delay.module.scss";
import Spinner from "@components/Partials/Spinner/Spinner";
import * as util from "@components/Helpers/Functions/functions";

function withDelay(PropsComponent, props = {}, ms = 1500) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.timer = null;
            this.state = { isDelayEnded: false };
        }

        componentDidMount() {
            util.addScrollbarOffset();
            this.timer = setTimeout(() => {
                this.setState((state) => {
                    return {
                        isDelayEnded: true
                    }
                })
            }, ms);
        }

        render() {
            if (!this.state.isDelayEnded) return <div className={styles.overlay}><Spinner/></div>;
            return <PropsComponent {...props}/>
        }
    }
}

export default withDelay;


