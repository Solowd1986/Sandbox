import React, { Component } from "react";
import styles from "./overlay.module.scss";
import classNames from "classnames";

import * as util from "./helpers/functions";
import Spinner from "./Spinner/Spinner";

import * as modalActions from "../../../redux/entities/modal/actions";
import { connect } from "react-redux";
import ModalContent from "./ModalContent/ModalContent";

class Overlay extends Component {
    state = {
        isDelayEnded: false
    };

    constructor(props) {
        super(props);
        this.addScrollbarOffset();
        this.delayModalTimer = null;
    }

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
        const { bg = false, delay = false, children = null } = this.props;
        const classList = classNames(styles.overlay, {
            [styles.overlay_bg]: bg === true
        });

        let modalContent = null;
        if (delay && !this.state.isDelayEnded) {
            modalContent = <Spinner/>;
        } else {
            modalContent = <ModalContent children={children}/>
            //
            // <div className={"animate__animated animate__bounceInRight"}>
            // {this.props.children && <span className={styles.close}/>}
            //
            //
            // {/*тут div нужен для перехвата кликов, чтобы любой модальный элемент не вызывал закрытие окна*/}
            // {/*практика общая, поэтому вынесено сюда*/}
            //     <div onClick={(evt) => evt.stopPropagation()}>
            //         {children}
            //     </div>
            // </div>
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
            dispatch(modalActions.disableModal());
        }
    }
}

export default connect(null, mapDispatchToProps)(Overlay);









