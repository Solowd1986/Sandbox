import React, { Component } from "react";
import styles from "./with-modal.module.scss";
import * as util from "@components/Partials/Modal/helpers/functions";

function withModal(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            util.addScrollbarOffset();
            this.state = {
                isModalActive: true
            };
        }

        closeModal = (evt) => {
            if (!("modal" in evt.target.dataset)) return;
            util.removeScrollbarOffset();
            this.setState({
                isModalActive: false
            });
        };


        render() {
            if (!this.state.isModalActive) return null;
            return (
                <div className={styles.overlay} onClick={this.closeModal} data-modal={true}>
                    <WrappedComponent closeModal={() => this.setState({ isModalActive: false })}/>
                </div>
            )
        }
    }
}


export default withModal;

