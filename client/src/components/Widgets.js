import React from "react";
import "../css/Widgets.css"

import {
    TwitterTimelineEmbed,
} from 'react-twitter-embed';

import SearchIcon from '@material-ui/icons/Search';

const Widgets =() =>{
    return(
        <div className="widgets">
            <div className="widgets__input">
                <SearchIcon className="widgets_searchIcon" />
                <input placeholder="Search Twitter" type="text"/>
            </div>

            <div className="widgets__widgetContainer">
                <h2>What's happening</h2>

                <TwitterTimelineEmbed
                 sourceType="profile"
                 screenName="olatundesucces1"
                 options={{height: 800}}
                />

            </div>

        </div>
    );
}

export default Widgets;