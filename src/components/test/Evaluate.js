import React, {Component} from "react";

export default class Evaluate extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleField = (e) => {
        console.log("inp");
    };

    blurField = (e) => {
        console.log("lost");
    };

    handlerSend = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <h3 style={{ width: "600px", margin: "30px auto 30px" }}>
                <form className="form" action="/" name="auth-form" method="POST">
                    <label style={{ marginRight: "20px" }} htmlFor="login">Login</label>
                    <input onChange={this.handleField} onBlur={this.blurField} style={{ padding: "10px", marginRight: "20px" }} type="text" name="login" required/>
                    <input onClick={this.handlerSend} type="submit" name="auth-submit" value="Send"/>
                </form>
            </h3>
        )
    }
}


