import React, {Component} from "react";
import styles from "./overlay-comp.module.scss";
import actions from "../../../redux/actions";
import {connect} from "react-redux";

class OverlayComp extends Component {
    constructor(props) {
        super(props);
        this.defaultFixedElemSelector = "[data-fs]";
        this.classList = [];
        this.innerElement = null;
        this.coloredBackground = false;
        this.node = null;
        this.init();
    }


    /**
     * Статический метод расчета ширины скроллбара
     * @returns {number}
     */
    calcScrollBarWidth = () => {
        // Получаем ширину окна, это аналог width: 100vw (то есть ширина 100% + ширина scrollbar)
        const windowWidth = window.innerWidth;
        // Получаем ширину документа, это аналог width: 100%
        const documentWidth = document.documentElement.clientWidth;
        // Возвращаем разницу между этими величинами, это и есть ширина scrollbar.
        // Если его нет, то вернутся такие значения -1 или 0, поэтому проверка лучше на > 0
        return windowWidth - documentWidth;
    };

    /**
     * 1. Создаем overlay, задаем либо переданные классы либо берем стили по-умолчанию
     * 2. Добавляем фикс скроллбара и запрел на скролл body, добавляем overlay к body
     * 3. Возращаем элемент, теперь инициировавший вызов может, например, повесить на элемент слушателя событий
     * @returns node
     */
    init = () => {
        this.addScrollbarOffset();
    };

    /**
     * Добавляем смещение, если скроллбар есть на странице, если нет - просто блокируем прокрутку для body
     * Также вызываем метод смещения fixed/absolute элементов, все элементы берутся по селектору defaultFixedElemSelector
     */
    addScrollbarOffset = () => {
        if (this.calcScrollBarWidth() > 0) {
            document.body.style.cssText = `padding-right: ${this.calcScrollBarWidth()}px`;
            this.addOffsetFixedElements(this.defaultFixedElemSelector);
        }
        document.body.style.cssText += "overflow: hidden";
    };

    /**
     * 1. Получаем на вход селетор fixed/absolute элементов, берем ширину документа, она понадобится позже
     * 2. Тут обрабатываются два сценария:
     *
     *    - проверяем, fixed/absolute элемент по ширине равен странице, значит он тянется на 100%, поэтому просто бере его
     *    ширину и принудительно ставим ее при исчезновении скролла. Так элемент не будет прыгать.
     *
     *    - второй вариант, это fixed/absolute элемент с фиксированной шириной меньшей ширины документа, например, кнопка "Наверх".
     *    По-умолчанию, она, к примеру прижимается к правому краю страницы с right:0, потом скролл исчезает и элемент прыгает. Решение: дать элементу
     *    right справа в ширину этого исчезнувшего скролла, так элемент не прыгает.
     */
    addOffsetFixedElements = (selector) => {
        const elements = document.querySelectorAll(selector);
        const documentWidth = document.documentElement.clientWidth;
        elements.forEach(item => {
            const elementWidth = parseInt(getComputedStyle(item).getPropertyValue("width"));

            if (documentWidth === elementWidth) {
                item.style.cssText = `width: ${elementWidth}px;`;
            } else {
                const offsetRigth = parseInt(getComputedStyle(item).getPropertyValue("right"));
                item.style.cssText = `right: ${offsetRigth + this.calcScrollBarWidth()}px;`;
            }
        })

    }

    /**
     * Обратная процедура, удаление скроллбара и смещений элементов.
     */
    removeScrollbarOffset = () => {
        document.body.style.removeProperty("padding-right");
        document.body.style.removeProperty("overflow");
        const elements = document.querySelectorAll(this.defaultFixedElemSelector);
        elements.forEach(item => {
            item.style.removeProperty("width");
            item.style.removeProperty("right");
        })
    };

    /**
     * Удаление элемента
     */
    destroy = () => {
        this.removeScrollbarOffset();
        this.props.toggleOverlay();
    };

    render() {
        console.log(this.props);

        return (
            <div onClick={this.destroy} className={styles.overlay}>
                <div onClick={(evt) => evt.stopPropagation()}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default OverlayComp;








