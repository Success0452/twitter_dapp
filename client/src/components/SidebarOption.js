import React from "react";
import "../css/SidebarOption.css";

const SidebarOption =({text, Icon, onPress}) => {

    return(
        <div className="sidebarOption">

        <Icon />
        <h2>{text}</h2>

        </div>
    )
}

export default SidebarOption;