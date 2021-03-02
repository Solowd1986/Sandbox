import React, { Component } from "react";

export default class Login extends Component {


    render() {
        const { logged } = this.props;
        return (
            <button onClick={this.login}>Login</button>
        )
    }
}


/*
<form className="form" action="/" name="auth-form" method="POST" >
    <input className="form__input" type="text" name="login" placeholder="Enter login..."/>
    <input className="form__input" type="password" name="psw" placeholder="Enter psw..."/>
    <input className="form__submit" type="submit" name="auth-submit" value="Send"/>
</form>

 */
