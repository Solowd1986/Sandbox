import React, {Component, useState} from "react";

import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../PromoBadge/PromoBadge";
import Evaluate from "../../test/Evaluate";
import PropTypes from 'prop-types';

import {NavLink, Route, Switch} from "react-router-dom";

import Input from "../../Core/Form/Input/Input";
import Category from "../Categorie/Category";
import Product from "../Product/Product";
import Order from "../Order/Order";
import Item from "../../test/Item";


class Cart extends Component {

    state = {
        users: [
            { name: 'bob' }
        ],
        products: [
            {
                id: 1,
                title: "Samsung",
                color: "green",
                price: 12000,
                imgPath: "./photo",
                quantity: 2,
                rest: 21
            },
            {
                id: 2,
                title: "IPhone",
                color: "red",
                price: 56000,
                imgPath: "./photo",
                quantity: 4,
                rest: 15
            },
            {
                id: 3,
                title: "Nokia",
                color: "black",
                price: 34110,
                imgPath: "./photo",
                quantity: 1,
                rest: 50
            },
        ]
    };


    changer = (id, quantity) => {

        const obj = this.state.products.find(item => item.id === id);

        if (isNaN(parseInt(quantity))) {
            return false;
        } else {
            obj.quantity = Math.max(1, Math.min(obj.rest, parseInt(quantity)));
            const products = [...this.state.products];
            products[this.state.products.indexOf(obj)] = obj;
            this.setState({ products });
        }
    };


    calcTotal = () => {
        return this.state.products.reduce((total, item) => {
            total += (item.price * item.quantity);
            return total;
        }, 0);
    };

    // 1. Создали копию массива товаров
    // 2. Удалили элемент, для этого узнали его индекс, передав на вход обьект, найденный по id.
    // 3. Заменили в обьекте state конкретный массив
    delete = (id) => {
        const products = [...this.state.products];
        products.splice(this.state.products.indexOf(products.find(item => item.id === id)), 1);
        this.setState({ products });
    };


    render() {
        const styleUl = { padding: "10px", margin: "10px" };

        return (
            <>
                <div style={{ width: "50%", margin: "0 auto" }}>
                    <h3>Links</h3>
                    <NavLink style={{ padding: "10px", backgroundColor: "lightgrey", marginRight: "10px" }}
                             to={"/"}>Main Page</NavLink>

                    <NavLink style={{ padding: "10px", backgroundColor: "lightgrey", marginRight: "10px" }}
                             to={"/category/phones"}>Phones Page</NavLink>

                    <NavLink style={{ padding: "10px", backgroundColor: "lightgrey", marginRight: "10px" }}
                             to={"/category/phones/other"}>Other Page</NavLink>

                    <NavLink style={{ padding: "10px", backgroundColor: "lightgrey", marginRight: "10px" }}
                             to={"/product/phones/one"}>Product Page</NavLink>

                    <NavLink style={{ padding: "10px", backgroundColor: "lightgrey", marginRight: "10px" }}
                             to={"/order"}>Order Page</NavLink>
                </div>


                <ul style={styleUl}>
                    {this.state.products.map(item => {
                        return (
                            <li key={item.id}>
                                <CartItem
                                    min={1}
                                    max={item.rest}
                                    product={item}
                                    itemHandler={this.changer}
                                    deleteItem={this.delete}
                                />
                            </li>
                        )
                    })}
                </ul>
                <p>Total: {this.calcTotal()}</p>
            </>
        )
    }
}


class CartItem extends Component {

    defaul1tProps = "name";
    static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        itemHandler: PropTypes.func.isRequired
    };


    handleChanger = (e) => {
        console.log(e.target.value);
    };

    decreaseAmount = (e, id) => {
        this.props.itemHandler(id, this.props.product.quantity - 1);
    };

    increaseAmount = (e, id) => {
        this.props.itemHandler(id, this.props.product.quantity + 1);
    };

    deleteItem = (id) => {
        this.props.deleteItem(id);
    };


    render() {

        const styleLi = { display: 'flex', padding: '10px', marginRight: '15px' };
        const styleP = { marginRight: '15px' };
        const styleInput = { padding: "5px 10px" };

        return (
            <>
                <span style={styleLi}>
                    <p style={styleP}>title: {this.props.product.title}|</p>
                    <p style={styleP}>quantity: {this.props.product.quantity}|</p>

                    <button onClick={(evt) => this.decreaseAmount(evt, this.props.product.id)} style={{ padding: "5px 10px" }}>-</button>

                    <input
                        onChange={(evt) => this.handleChanger(evt)}
                        style={styleInput}
                        type="text"
                        value={this.props.product.quantity}
                    />

                    <button onClick={(evt) => this.increaseAmount(evt, this.props.product.id)} style={{ padding: "5px 10px" }}>+</button>

                    <p style={styleP}>total price: {this.props.product.price * this.props.product.quantity}</p>
                    <button onClick={() => this.deleteItem(this.props.product.id)} style={{ padding: "5px" }}>Delete</button>
                </span>
            </>
        )
    }
}


export default class MainPage extends Component {

    render() {
        return (
            <>
                <Slider/>

                <Cart/>

                <Evaluate classes={'pros names'}/>

                <Promo/>
                <BrandStory/>
                <Announcements/>
                <About/>
                <PromoBadge/>
            </>
        )
    }
}





