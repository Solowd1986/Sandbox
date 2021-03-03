import React, { Component } from "react";
import styles from "./with-modal.module.scss";
import classNames from "classnames";
import * as util from "@components/Helpers/Functions/functions";

//<editor-fold desc="Описание">
/**
 *  parentCentered - использовать не fixed-контейнер на всю страницу, а по размеру родителя.
 *  interactionsDisabled - не закрывать оверлей по клику, если логика его скрытия другая
 */
//</editor-fold>

function withModal(WrappedComponent, parentCentered = false, interactionsDisabled = false) {
    return class extends Component {
        constructor(props) {
            super(props);
            util.addScrollbarOffset();
            this.state = {
                isModalActive: true
            };
        }

        closeModal = (evt) => {
            if (!("modal" in evt.target.dataset) || interactionsDisabled) return;
            this.setState({
                isModalActive: false
            });
        };

        componentDidUpdate(prevProps, prevState) {
            if (!this.state.isModalActive) {
                util.removeScrollbarOffset();
            }
        }

        render() {
            if (!this.state.isModalActive) return null;

            const classList = classNames({
                [styles.overlay]: !parentCentered,
                [styles.wrapper]: parentCentered,
            });
            return (
                <div className={classList} onClick={this.closeModal} data-modal={true}>
                    <WrappedComponent handlerCloseModal={() => this.setState({ isModalActive: false })}/>
                </div>
            )
        }
    }
}


export default withModal;

