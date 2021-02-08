import React, { Component } from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";

import * as util from "./helpers/functions";
import Spinner from "./Spinner/Spinner";

import * as modal from "../../../redux/entities/modal/actions";
import { connect } from "react-redux";
import ModalContent from "./ModalContent/ModalContent";

class Modal extends Component {

    constructor(props) {
        super(props);
        this.addScrollbarOffset();
        this.delayModalTimer = null;
    }

    state = {
        isDelayEnded: false
    };

    componentDidMount = () => {
        if (this.props.delay) {
            this.delayModalTimer = setTimeout(() => {
                this.setState((state) => {
                    return {
                        isDelayEnded: true
                    }
                })
            }, 1500);
        }
    };

    componentWillUnmount = () => {
        this.disableModal();
        clearTimeout(this.delayModalTimer);
    };

    addScrollbarOffset = () => {
        if (util.calcScrollBarWidth() > 0) {
            document.body.style.cssText = `width: ${document.body.clientWidth}px; overflow: hidden`;
            document.querySelector("header").style.cssText = `width: ${document.body.clientWidth}px`;
        }
    };

    removeScrollbarOffset = () => {
        document.body.style.removeProperty("width");
        document.body.style.removeProperty("overflow");
        document.querySelector("header").style.removeProperty("width");
    };

    disableModal = () => {
        this.removeScrollbarOffset();
        this.props.disableModal();
    };

    render() {
        const { bg = true, delay = false, children = null } = this.props;
        const classList = classNames(styles.overlay, {
            [styles.overlay_bg]: bg === true
        });

        let modalContent = null;
        if (delay && !this.state.isDelayEnded) {
            modalContent = <Spinner/>;
        } else {
            modalContent = <ModalContent children={children}/>
        }

        return (
            <div onClick={this.disableModal} className={classList}>
                {modalContent}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        disableModal: () => {
            dispatch(modal.disableModal());
        }
    }
}

export default connect(null, mapDispatchToProps)(Modal);









