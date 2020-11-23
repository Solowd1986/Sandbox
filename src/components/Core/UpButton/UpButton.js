import React, {Component} from "react";
import styles from "./up-button.module.scss";

class UpButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPageScrolledToBottom: false
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const offset = window.scrollY;
        const viewport = document.documentElement.clientHeight;
        if (offset > viewport) {
            this.setState({
                isPageScrolledToBottom: true
            });
        } else {
            this.setState({
                isPageScrolledToBottom: false
            });
        }
    };

    scrollUp = () => {
        window.scrollTo({ "top": 0, behavior: "smooth" });
    };

    render() {
        return (
            // checkScroll() && <button onClick={scrollUp} className={`${styles.btn}`}>Up</button>
            <div onClick={this.scrollUp} className={`${styles.up} ${this.state.isPageScrolledToBottom && styles.up__show}`}/>
        )
    }
}


export default UpButton;


