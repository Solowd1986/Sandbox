import React, {Component} from "react";


export default class Evaluate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: "none"
        }
    }


    names = { bob: "12" };

    handleChangeField = (e) => {
        //console.log("inp");
    };

    handleblurField = (e) => {
        this.setState({
            res: e.target.value
        })
    };

    handlerSend = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <h3 style={{ width: "600px", margin: "30px auto 30px" }}>

                <p>State: {this.state.res}</p>
                <form className="form" action="/" name="auth-form" method="POST">
                    <label style={{ marginRight: "20px" }} htmlFor="login">Login</label>
                    <input

                        onChange={this.handleChangeField}
                        onBlur={this.handleblurField}
                        style={{ padding: "10px", marginRight: "20px", backgroundColor: "lightgrey" }} type="text" name="login"
                        required
                    />

                    <input
                        style={{ padding: "10px" }}
                        onClick={this.handlerSend}
                        type="submit" name="auth-submit" value="Send"
                    />
                </form>
            </h3>
        )
    }
}


