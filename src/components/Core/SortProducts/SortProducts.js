import React, { Component } from "react";
import ReactDom from "react-dom";
import styles from "./sort-products.module.scss";
import classNames from "classnames";


class SortPorducts extends Component {

    state = {
        showSortPanel: false,
        sortType: "по популярности"
    };

    /**
     * Запрещаем всплытие при клике на кнопку открытия панели или на элемент выбора типа сортироваки, чтобы ониэ
     * не провоцировали срабатывание обработчика клика по window, иначе каждый клик по ним вызывал бы закрытие
     * панели выбор типа сортировки: клик по кнопке -> showSortPanel: true -> перехват клика на всплытие до window
     * -> вызов controlSortPanel, проверка на true продена -> скрытие панели.
     * @param evt
     */

    toggleSortPanel = (evt) => {
        evt.stopPropagation();
        this.setState((state) => {
            return {
                showSortPanel: !this.state.showSortPanel
            }
        })
    };

    changeSortType = (evt) => {
        evt.stopPropagation();
        if (evt.target.nodeName === "LI") {
            this.setState((state) => {
                return {
                    sortType: evt.target.innerText,
                    showSortPanel: false
                }
            })
        }

    };

    closeSortPanelOnClickByWindow = () => {
        this.setState((state) => {
            if (state.showSortPanel === true)
                return {
                    showSortPanel: false
                }
        })
    };

    /**
     * Методу сортировки как свойство передается сортируемый массив, через redux достпен методы изменения массива,
     * данных, например, всей категории товаров, например и тут из метода таким сеттером устаналивается
     * новый отсортированный массив
     */
    sortDataList = (dataList, sortType = this.state.sortType) => {
        const cloneDeep = require('lodash.clonedeep');
        let list = cloneDeep(dataList);

        switch (sortType) {
            case "по популярности": {
                break;
            }
            case "по возрастанию цены": {
                list.sort((a, b) => a.price - b.price);
                break;
            }
            case "по убыванию цены": {
                list.sort((a, b) => b.price - a.price);
                break;
            }
            case "по новизне": {
                break;
            }
            case "по скидкам": {
                break;
            }
        }
        return list;
    };


    componentDidMount() {
        window.addEventListener("click", this.closeSortPanelOnClickByWindow);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.closeSortPanelOnClickByWindow);
    }

    render() {
        const classList = classNames(styles.sort_list_panel, "animate__animated animate__fadeInUp animate__faster", {
            [styles.panel_show]: this.state.showSortPanel === true,
            [styles.panel_hide]: this.state.showSortPanel === false,
        });
        return (
            <>
                <div className={styles.sort_wrapper}>
                    <span className={styles.sort_title}>Сортировать: </span>
                    <span className={styles.sort_type} onClick={this.toggleSortPanel}>{this.state.sortType}
                        <svg
                            width={"9px"}
                            height={"9px"}
                            className={styles.sort_icon}
                            viewBox="0 0 451.847 451.847">
                        <path
                            d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"/>
                    </svg>
                </span>
                    <ul className={classList} onClick={this.changeSortType}>
                        <li>по новинкам</li>
                        <li>по популярности</li>
                        <li>по возрастанию цены</li>
                        <li>по убыванию цены</li>
                        <li>по скидкам</li>
                    </ul>
                </div>
            </>
        )
    }
}

export default SortPorducts;


