import React, { Component } from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";

import * as util from "./helpers/functions";

import ModalContent from "@components/Core/Modal/ModalContent/ModalContent";
import Spinner from "./Spinner/Spinner";

import * as modalActions from "@redux/entities/modal/actions";
import { connect } from "react-redux";

class Modal extends Component {
    constructor(props) {
        super(props);
        util.addScrollbarOffset();
        this.delayModalTimer = null;
        this.state = { isDelayEnded: false };
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


    disableModal = () => {
        util.removeScrollbarOffset();
        this.props.disableModal();
    };

    render() {
        const { bg = true, delay = false, children = null } = this.props;
        const classList = classNames(styles.overlay, {
            [styles.overlay_bg]: bg
        });

        const modalContent =
            delay && !this.state.isDelayEnded
                ? <Spinner/>
                : <ModalContent children={children} closeModal={this.disableModal}/>;

        // реализуй проброс метода отключения модалки в компонент
        // который она оборачивает. Для самой модалки отключение только кликом по оверлею

        // реализуй невисимость оверлая от блокировки всплытия клика. То есть, добавь например дата-атрибут оверлую
        // и проверя при клике совпадение, причем через currentTarget (или как там),
        // чтобы ловить именно клик по оверелю, а не тот, что всплыл

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

export default connect(null, mapDispatchToProps)(Modal);









