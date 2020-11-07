import React, {Component} from "react";
import Layout from "./components/Core/Layout/Layout";
import {BrowserRouter} from "react-router-dom";

export default class App extends Component {
    render() {
        return (
            <React.StrictMode>
                <BrowserRouter>
                    <div className="App">
                        <Layout/>
                    </div>
                </BrowserRouter>
            </React.StrictMode>
        )
    }
}


