import React, { Component } from "react";

export default function withMsg(Props) {
    return class extends Component {

        log = () => {
            return "got some logs, boys!"
        };

        render() {
            return (
                <Props log={this.log}/>
            )
        }
    }
}


