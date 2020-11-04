import React, {Component, useState} from "react";

import Slider from "./Slider";
import Promo from "./Promo";
import BrandStory from "./BrandStory";
import Announcements from "./Announcements";
import About from "./About";
import PromoBadge from "../../PromoBadge/PromoBadge";
import Evaluate from "../../test/Evaluate";
import PropTypes from 'prop-types';


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
            quantity = Math.max(1, Math.min(obj.rest, parseInt(quantity)));
        }

        obj.quantity = quantity;
        const index = this.state.products.indexOf(obj);

        const base = { ...this.state };
        base.products[index] = obj;

        this.setState(base);


    };


    render() {

        const styleUl = { padding: "10px", margin: "10px" };
        return (
            <>
                <ul style={styleUl}>
                    {this.state.products.map(item => {
                        return (
                            <div key={item.id}>
                                <li>
                                    <CartItem min={1} max={item.rest} product={item} itemHandler={this.changer}/>
                                </li>
                                <hr/>
                            </div>
                        )
                    })}
                </ul>
                <p>Total:</p>
            </>
        )
    }
}


class CartItem extends Component {

    static defaultState = {
        min: 1,
        itemHandler: () => {
        }
    };

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
                        <input onChange={this.handleChanger} style={styleInput} type="text" value={this.props.product.quantity}/>
                        <button onClick={(evt) => this.increaseAmount(evt, this.props.product.id)} style={{ padding: "5px 10px" }}>+</button>

                        <p style={styleP}>total price: {this.props.product.price * this.props.product.quantity}</p>
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

                <Evaluate/>

                <Promo/>
                <BrandStory/>
                <Announcements/>
                <About/>
                <PromoBadge/>
            </>
        )
    }
}





