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
            <div style={{ width: "600px", margin: "30px auto 30px" }}>

                <div>
                    <button onClick={() => {
                        const modal = document.querySelector(".md-modal");

                        function calcScrollBarWidth() {
                            const windowWidth = window.innerWidth;
                            const documentWidth = document.documentElement.clientWidth;
                            return windowWidth - documentWidth;
                        }

                        const offset = calcScrollBarWidth();
                        if (offset > 0) {
                            console.log(12);

                            document.body.style.cssText = `padding-right: ${offset}px`
                        }
                        document.body.style.cssText += "overflow: hidden";




                        modal.classList.add("md-show");
                    }}>show
                    </button>

                    <div className="md-modal md-effect-1" id="modal-1">

                        <div className="md-content">
                            <h3>Модальное окно</h3>
                            <div>
                                <p>Это модальное окно. Вы можете делать следующие вещи с ним:</p>
                                <button className="md-close">Закрыть!</button>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => {
                        const modal = document.querySelector(".md-modal");
                        modal.classList.remove("md-show");
                        document.body.style.removeProperty("padding-right");
                        document.body.style.removeProperty("overflow");
                    }} className="md-overlay"/>


                </div>

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
            </div>
        )
    }
}


