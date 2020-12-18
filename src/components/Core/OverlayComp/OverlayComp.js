import React, {Component} from "react";
import styles from "./overlay-comp.module.scss";
import actions from "../../../redux/actions";
import {connect} from "react-redux";

class OverlayComp extends Component {
    constructor(props) {
        super(props);
        this.defaultFixedElemSelector = "[data-fs]";
        this.classList = [];
        this.coloredBg = props.coloredBg || false;
        this.init();
        this.timer = null;
    }


    componentDidMount = () => {
        if (this.props.delay) {
            this.timer = setTimeout(() => {
                this.props.delayOrder()
            }, 1500);
        }
    };

    componentWillUnmount = () => {
        clearTimeout(this.timer);
    };




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
        //const documentWidth = document.documentElement.clientWidth;
        elements.forEach(item => {
            const elementWidth = parseInt(getComputedStyle(item).getPropertyValue("width"));
            if (item.parentElement.clientWidth < item.clientWidth) {
                item.style.cssText = `width: ${elementWidth}px;`;
            } else {
                const offsetRigth = parseInt(getComputedStyle(item).getPropertyValue("right"));
                item.style.cssText = `right: ${offsetRigth + this.calcScrollBarWidth()}px;`;
            }
        })
    };

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
        this.props.disableOverlay();
    };

    render() {
        //console.log(this.props);
        return (
            <div onClick={this.destroy} className={`${styles.overlay} ${this.coloredBg && styles.overlay_bg}`}>
                <div>
                    {
                        this.props.delay
                            ?
                            !this.props.orderIsProcessed
                                ?
                                <svg
                                    className={styles.spinner}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 489.711 489.711"
                                    width={88}
                                    height={88}>
                                    <g>
                                        <path
                                            d="M112.156 97.111c72.3-65.4 180.5-66.4 253.8-6.7l-58.1 2.2c-7.5.3-13.3 6.5-13 14 .3 7.3 6.3 13 13.5 13h.5l89.2-3.3c7.3-.3 13-6.2 13-13.5v-1-.6l-3.3-88.2c-.3-7.5-6.6-13.3-14-13-7.5.3-13.3 6.5-13 14l2.1 55.3c-36.3-29.7-81-46.9-128.8-49.3-59.2-3-116.1 17.3-160 57.1-60.4 54.7-86 137.9-66.8 217.1 1.5 6.2 7 10.3 13.1 10.3 1.1 0 2.1-.1 3.2-.4 7.2-1.8 11.7-9.1 9.9-16.3-16.8-69.6 5.6-142.7 58.7-190.7zM462.456 195.511c-1.8-7.2-9.1-11.7-16.3-9.9-7.2 1.8-11.7 9.1-9.9 16.3 16.9 69.6-5.6 142.7-58.7 190.7-37.3 33.7-84.1 50.3-130.7 50.3-44.5 0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-.7 12.9-7.2 12.2-14.7s-7.2-12.9-14.7-12.2l-88.9 8c-7.4.7-12.9 7.2-12.2 14.7l8 88.9c.6 7 6.5 12.3 13.4 12.3.4 0 .8 0 1.2-.1 7.4-.7 12.9-7.2 12.2-14.7l-4.8-54.1c36.3 29.4 80.8 46.5 128.3 48.9 3.8.2 7.6.3 11.3.3 55.1 0 107.5-20.2 148.7-57.4 60.4-54.7 86-137.8 66.8-217.1z"/>
                                    </g>
                                </svg>
                                :
                                <div className={"animate__animated animate__bounceInRight"}>
                                    <span className={styles.close}/>
                                    {/*тут div нужен для перехвата кликов, чтобы любой модальный элемент не вызывал закрытие окна*/}
                                    {/*практика общая, поэтому вынесено сюда*/}
                                    <div onClick={(evt) => evt.stopPropagation()}>
                                        {this.props.children}
                                    </div>
                                </div>
                            :
                            <div className={"animate__animated animate__bounceInRight"}>
                                <span className={styles.close}/>
                                {/*тут div нужен для перехвата кликов, чтобы любой модальный элемент не вызывал закрытие окна*/}
                                {/*практика общая, поэтому вынесено сюда*/}
                                <div onClick={(evt) => evt.stopPropagation()}>
                                    {this.props.children}
                                </div>
                            </div>
                    }
                </div>

            </div>
        )
    }
}

export default OverlayComp;








