import React from "react";
import NavigationAuthed from "./NavigationAuthed";

interface Props {
    children: any;
}

function LayoutAuthed(props: Props) {
    return (
        <div className="gaspar" data-magic-cursor="show" data-color="crimson">
            {/* Pre-Loader Start*/}
            {/* <div id="preloader">
                <div className="loader_line" />
            </div> */}
            {/* Pre-Loader end */}
            {/* Style switcher start */}
            {/* Header-section Start*/}
            <NavigationAuthed />
            {/* Header-section End*/}
            {/* section-part Start */}
            <div className="container ">{props.children}</div>
            {/* section-part End*/}
            {/* Mouse-Cursor */}
            <div className="mouse-cursor cursor-outer" />
            <div className="mouse-cursor cursor-inner" />
            {/* Mouse-Cursor End*/}
        </div>
    );
}

export default LayoutAuthed;
