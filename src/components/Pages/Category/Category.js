import React, { Component } from "react";
import * as PropTypes from "prop-types";

import CategoryProductsList from "./CategoryProductsList/CategoryProductsList";
import Spinner from "@components/Partials/Spinner/Spinner";
import withModal from "@components/Helpers/Hoc/withModal/withModal";

import { bindActionCreators } from 'redux';
import * as serverActions from "@redux/entities/db/actions";
import { connect } from "react-redux";


//<editor-fold desc="Описание компонента">
/**
 * 1. Как только пришли, конструктор создает запрос и формирует начальный state
 * 2. В рендер стейт пуст, значит выводим спиннер.
 * 3. Данные пришли, рендер, стейт все еще пуст, но в DidUpdate меняет стейт
 *
 *
 * Тут выполняются три проверки:
 * 1. Первый рендер компонента: спиннер показывает пока стейт пуст, а потом показывается категория
 * 2. Второй рендер это получение свойств. Стейст уже есть.
 * Человек нажал на ссылку, пришли пропсы, перед првоеркой забрали алиас стейста, например phones
 * Сравниил: алисас стейста равен пропсам - нет, значит спиннер. А в дидапдейт вызвали запрос данных.
 * Данные пришли, сравниваем: алисас стейста все еще не равен пропсам. Потому что новые данные покатегории пришли
 * но еещ не записаны в стейст, опять спиннер. В дидапдейст ставим новый стейст и вызываем ре-рендер
 * Приходитм опять сюда: алиас стейста равен пропсам пути (пута) - проверка пройдена, отрисовываем категоирю
 */
    //</editor-fold>
class Category extends Component {
    static propTypes = {
        clearCategoryPageReduxData: PropTypes.func,
        sortType: PropTypes.string,
        lastIndex: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.isSorted = false;
        this.state = {
            categoryProductsList: null,
            lastIndex: 0
        };
    }

    isProductListStateEmpty = () => !this.state.categoryProductsList;
    getCurrentCategoryAlias = () => this.state.categoryProductsList && this.state.categoryProductsList.main.alias;
    isThisAnotherCategoryPage = () => this.getCurrentCategoryAlias() !== this.props.match.params.type;
    clearComponentState = () => this.setState(state => ({ categoryProductsList: null, lastIndex: 0 }));
    sortDataList = (evt, dataList = this.state.categoryProductsList.data, sortType = this.props.sortType) => {
        if (!dataList) return;
        const cloneDeep = require('lodash.clonedeep');
        let data = cloneDeep(dataList);

        switch (sortType) {
            case "по популярности": {
                break;
            }
            case "по возрастанию цены": {
                data.sort((a, b) => a.price - b.price);
                break;
            }
            case "по убыванию цены": {
                data.sort((a, b) => b.price - a.price);
                break;
            }
            case "по новизне": {
                break;
            }
            case "по скидкам": {
                break;
            }
        }
        // так мы сохраняем блок main и заменяем блок data, в state categoryProductsList состоит из двух полей
        this.setState(state => ({ categoryProductsList: { ...this.state.categoryProductsList, data } }));
    };


    //<editor-fold desc="Вариации смены state">
    /**
     *
     *
     *
     */
    //</editor-fold>
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.isProductListStateEmpty() && this.props.category) {
            this.setState(state => ({ categoryProductsList: this.props.category }));
        }
        if (this.isThisAnotherCategoryPage() && !this.isProductListStateEmpty()) {
            this.clearComponentState();
            this.props.clearCategoryPageReduxData();
            this.props.fetchPageData(this.props);
        }
        if (!this.isProductListStateEmpty() && this.state.lastIndex !== this.props.lastIndex) {
            const cloneDeep = require('lodash.clonedeep');
            let data = cloneDeep(this.props.lazy);
            this.setState({
                lastIndex: this.props.lastIndex,
                categoryProductsList: {
                    main: this.state.categoryProductsList.main,
                    data: [...this.state.categoryProductsList.data, ...data]
                }
            })
        }
        if (prevProps.sortType !== this.props.sortType) {
            this.sortDataList();
            this.isSorted = true;
        }
        if (this.props.lastIndex > 0 && !this.isSorted && this.state.lastIndex === this.props.lastIndex) {
            this.isSorted = false;
            // страница с лази товарами отрисовалась, это уже после render - прокурти вниз
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
        prevProps.sortType === this.props.sortType ? this.isSorted = false : null;
    }


    componentDidMount() {
        this.props.fetchPageData(this.props);
    }

    componentWillUnmount() {
        this.props.clearCategoryPageReduxData(); // очистка reudx-state при каждом размонтировании компонента
    }

    render() {
        if (this.isProductListStateEmpty() || this.isThisAnotherCategoryPage()) {
            const SpinnerModal = withModal(Spinner, { bg: false, interactionsDisabled: true });
            return <SpinnerModal/>;
        } else {
            const { main: category, data: products } = this.state.categoryProductsList;
            return <CategoryProductsList category={category} products={products}/>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.db.category,
        sortType: state.sort.sortType,
        lazy: state.db.lazy,
        lastIndex: state.db.lastIndex
    }
};

const mapDispatchToProps = (dispatch) => ({ ...bindActionCreators(serverActions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(Category);





















