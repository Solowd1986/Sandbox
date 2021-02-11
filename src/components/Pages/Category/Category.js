import React, { Component } from "react";
import common from "~scss/common.module.scss";
import styles from "./category.module.scss";
import Layout from "~components/Core/Layout/Layout";
import { connect } from "react-redux";

import * as server from "../../../redux/entities/db/actions";
import CategoryProductsList from "./CategoryProductsList";
import BlockOverlay from "../../Core/Modal/BlockOverlay/BlockOverlay";


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryProductsList: {}
        };
        this.props.fetchCategoryProducts(this.props.match.params.type);
    }

    componentDidMount() {
        //console.log(1155);
        //window.scrollTo(0, 0); // always on top of page, without smooth scroll

        window.scrollTo(0, 0);
        //document.body.style.cssText = `width: ${document.body.clientWidth}px; overflow: hidden; position: relative`;
        //document.querySelector("header").style.cssText = `width: ${document.body.clientWidth}px`;

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log('did update');

        const isThisInitialSetState = Object.keys(this.state.categoryProductsList).length === 0;

        const currentCategoryAlias = !isThisInitialSetState && this.state.categoryProductsList.main.alias;
        const nextCategoryAlias = !isThisInitialSetState && this.props.category.main.alias;

        const currentRoute = prevProps.match.params.type;
        const nextRoute = this.props.match.params.type;


        if (isThisInitialSetState) {
            this.setState({
                categoryProductsList: this.props.category
            })
        }

        if (currentRoute !== nextRoute) {
            this.props.fetchCategoryProducts(nextRoute);
        }


        // Такая проверка потому:
        // 1. isThisInitialSetState - проверяем, не первый ли это вход в компонент
        // 2. currentCategoryAlias - это alias для стейта, на основе него и рисуется содержимое
        // 3. Он не доложен быть равен руту следующему, который приходит по клику в пропсах
        // Еслии првоерку остановить тут, пока будет идти запрос на сервер, тут условие все еще будет выполняться
        /**
         * И это вызовет переполнение стека. Поэтому идет вторая проверка: алиас со стейта должен стать равен алиса с пропсов
         * ЭЭто укажет, что стейет был установлен по факту.
         * это сработает когда свреху заданный запрос спровоцирует оотвт и он придет, и вот этих просах пришедних алиас
         * не будет равен текущшему алис из стейт и это вызовет смену. А потмо еще раз суюда придем и в это условие
         * уже не попадем
         * ловим омент когда категория уже пришла, до тэого категория остается той же что была для текущей версии, той что видим
         *
         */

        if (currentCategoryAlias !== nextRoute && currentCategoryAlias !== nextCategoryAlias) {
            this.setState({
                categoryProductsList: this.props.category
            })
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {

        return null
    }


    render() {
        console.log('rend');
        console.log(this.props);


        /**
         *
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
         *
         */

        let productsList = null;
        const isProductsListEmpty = Object.keys(this.state.categoryProductsList).length === 0;
        const alias = isProductsListEmpty ? null : this.state.categoryProductsList.main.alias;


        //document.body.style.cssText = `width: ${document.body.clientWidth}px; overflow: hidden; position: relative`;

        //console.log(document.body);
        //console.log(document.querySelector("header"));

        //if (document.querySelector("header"))
        //document.querySelector("header").style.cssText = `width: ${document.body.clientWidth}px`;


        // if (!isProductsListEmpty && this.props.category.error !== undefined) {
        //     console.log(1888);
        //
        //     productsList = <div>ERROR</div> ;
        // }


        if (isProductsListEmpty || alias !== this.props.match.params.type) {
            productsList = <BlockOverlay/>;
            //productsList = <Overlay><Layout>{this.props.children}</Layout></Overlay>
            //return null
        } else {
            const { main: category, data: products } = this.state.categoryProductsList;
            productsList = <CategoryProductsList category={category} products={products}/>;
        }

        //`width: ${document.body.clientWidth}px`;
        return (
            <Layout>
                {productsList}
            </Layout>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        category: state.db.category,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryProducts: (category) => {
            dispatch(server.fetchCategoryProducts(category));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Category);



