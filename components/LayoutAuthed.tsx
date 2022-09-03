import React, { useContext } from "react";
import SessionContext from "../context/session-context";
import NavigationAuthed from "./NavigationAuthed";
import Router from 'next/router'

interface Props {
    children: any;
}

function LayoutAuthed(props: Props) {
    const { session, updateSession } = useContext(SessionContext);

    if (session === null) {
        Router.push('/login')

    }
    
    if (!session) {
        return (
            <div id="preloader">
                <div className="loader_line" />
            </div>
        );
    }

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
