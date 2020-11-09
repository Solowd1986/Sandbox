import React, {Component} from "react";
import styles from "./modal-overlay.module.scss"

export default class ModalOverlay extends Component {
    constructor(props) {
        super(props);
        this.addScrollbarOffset();
    }


    calcScrollBarWidth = () => {
        // Получаем ширину окна, это аналог width: 100vw (то есть ширина 100% + ширина scrollbar)
        const windowWidth = window.innerWidth;
        // Получаем ширину документа, это аналог width: 100%
        const documentWidth = document.documentElement.clientWidth;
        // Возвращаем разницу между этими величинами, это и есть ширина scrollbar.
        // Если его нет, то вернутся такие значения -1 или 0, поэтому проверка лучше на > 0
        return windowWidth - documentWidth;
    };

    addScrollbarOffset = () => {
        if (this.calcScrollBarWidth() > 0) {
            document.body.style.cssText = `padding-right: ${this.calcScrollBarWidth()}px`
        }
        document.body.style.cssText += "overflow: hidden";
    };

    removeScrollbarOffset = () => {
        document.body.style.removeProperty("padding-right");
        document.body.style.removeProperty("overflow");
    };

    closeModal = () => {
        this.props.setModalStatus();
    };

    componentWillUnmount() {
        this.removeScrollbarOffset();
    }

    stop = (e) => {
        e.stopPropagation();
    };

    render() {
        return (
            <div
                onClick={this.closeModal}
                className={`${styles.main} ${this.props.classList}`}>
                <div className={"mod"} onClick={this.stop}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


