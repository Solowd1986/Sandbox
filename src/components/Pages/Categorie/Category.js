
import React, {Component} from "react";
import styles from "./category.module.scss";
import PhonesCategory from "./PhonesCategory";
import OtherCategory from "./OtherCategory";

export default class Category extends Component {
    render() {
        console.log(this.props.match.params);
        return (
            <>
                {this.props.match.params.type === "phones" ? <PhonesCategory/> : <OtherCategory/>}
            </>
        )
    }
}
