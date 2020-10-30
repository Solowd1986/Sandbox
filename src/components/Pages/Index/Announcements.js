import React from "react";
import Style from "./announcements.module.scss";

const Announcements = props => {
    return (
        <div>
            {props.children}
        </div>
    )
};

export default Announcements;
