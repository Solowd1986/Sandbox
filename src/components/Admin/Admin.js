import React, {Component} from "react";
import styles from "./admin.module.scss";
import { NavLink } from "react-router-dom";


const Table = () => (
    <div>

    </div>
);


class Admin extends Component {
    constructor(props) {
        super(props);
        this.sm = 12;
        this.getTables();
    }


    getTables = () => {
        const axios = require('axios').default;

        axios.get('/api/get/all')
            .then(function (response) {
                // handle success
                console.log("responce", response);
            }).catch(function (error) {
            //console.log("Axios Error - ", error);
        }).then(function () {
            // always executed
        });
    };

    createTable = () => {

    };

    componentDidMount() {
        this.sm = 14;
    }

    render() {
        return (
            <>
                <nav>
                    <NavLink to={"/"}>
                        <span>Back</span>
                    </NavLink>
                </nav>
                <div className={styles.main}>
                    <h1>Admin</h1>
                    <button onClick={this.createTable}>Создать таблицу</button>
                    <div className={styles.contentRoot}/>
                </div>
            </>
        )
    }
}


export default Admin;
