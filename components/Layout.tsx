import React from "react";
import { ActiveRoute } from "../types/global";
import Navigation from "./Navigation";

interface Props {
    children: any;
    haveNav?: boolean;
    id?: string | string[] | undefined;
    activeRoutes?: ActiveRoute[];
}

function Layout({ id, haveNav = true, children, activeRoutes }: Props) {
    return (
        <div className="gaspar" data-magic-cursor="show" data-color="crimson">
            {/* Pre-Loader Start*/}
            {/* <div id="preloader">
                <div className="loader_line" />
            </div> */}
            {/* Pre-Loader end */}
            {/* Style switcher start */}
            {/* Header-section Start*/}
            {haveNav && <Navigation id={id} activeRoutes={activeRoutes}/>}
            {/* Header-section End*/}
            {/* section-part Start */}
            <div className="container ">{children}</div>
            {/* section-part End*/}
            {/* Mouse-Cursor */}
            <div className="mouse-cursor cursor-outer" />
            <div className="mouse-cursor cursor-inner" />
            {/* Mouse-Cursor End*/}
        </div>
    );
}

export default Layout;
