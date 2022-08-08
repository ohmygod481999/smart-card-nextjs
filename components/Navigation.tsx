import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { edgeConfig } from "@ory/integrations/next";
import SessionContext from "../context/session-context";
import { ActiveRoute } from "../types/global";

interface Props {
    id: string | string[] | undefined;
    activeRoutes?: ActiveRoute[];
}

function Navigation(props: Props) {
    const router = useRouter();
    const { session } = useContext(SessionContext);
    const { pathname } = router;

    const { id, activeRoutes } = props;

    const _activeRoutes = activeRoutes ? activeRoutes : [];

    return (
        <div className="header-holder services-section text-center animate__animated animate__zoomIn">
            <div className="navigation">
                <ul className="nav">
                    <li
                        className={`list ${
                            pathname.includes("/home") ? "active" : ""
                        }`}
                    >
                        <Link href={`/user/${id}/home`}>
                            <a className="active">
                                <span className="icon">
                                    <i className="fas fa-house-user" />
                                </span>
                                <div className="social__tooltip social__tooltip-bottom">
                                    Home
                                </div>
                            </a>
                        </Link>
                    </li>
                    {_activeRoutes.includes(ActiveRoute.USER_CV) && (
                        <li
                            className={`list ${
                                pathname.includes(`/${ActiveRoute.USER_CV}`)
                                    ? "active"
                                    : ""
                            }`}
                        >
                            <Link href={`/user/${id}/${ActiveRoute.USER_CV}`}>
                                <a>
                                    <span className="icon">
                                        <i className="far fa-file" />
                                    </span>
                                    <div className="social__tooltip social__tooltip-bottom">
                                        CV của tôi
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )}
                    {/* <li
                        className={`list ${
                            pathname.includes("/about") ? "active" : ""
                        }`}
                    >
                        <Link href={`/user/${id}/about`}>
                            <a>
                                <span className="icon">
                                    <i className="fas fa-user-alt" />
                                </span>
                                <div className="social__tooltip social__tooltip-bottom">
                                    About
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li
                        className={`list ${
                            pathname.includes("/portfolio") ? "active" : ""
                        }`}
                    >
                        <Link href={`/user/${id}/portfolio`}>
                            <a>
                                <span className="icon">
                                    <i className="fas fa-briefcase" />
                                </span>
                                <div className="social__tooltip social__tooltip-bottom">
                                    Portfolio
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li
                        className={`list ${
                            pathname.includes("/contact") ? "active" : ""
                        }`}
                    >
                        <Link href={`/user/${id}/contact`}>
                            <a>
                                <span className="icon">
                                    <i className="fas fa-phone-alt" />
                                </span>
                                <div className="social__tooltip social__tooltip-bottom">
                                    Contact
                                </div>
                            </a>
                        </Link>
                    </li> */}
                    {session ? (
                        <li
                            className={`list ${
                                pathname.includes("/account") ? "active" : ""
                            }`}
                        >
                            {/* <Link href={edgeConfig.basePath + "/ui/login"}> */}
                            <Link href={`/`}>
                                <a>
                                    <span className="icon">
                                        <i className="fas fa-blog" />
                                    </span>
                                    <div className="social__tooltip social__tooltip-bottom">
                                        My account
                                    </div>
                                </a>
                            </Link>
                        </li>
                    ) : (
                        <li
                            className={`list ${
                                pathname.includes("/login") ? "active" : ""
                            }`}
                        >
                            {/* <Link href={edgeConfig.basePath + "/ui/login"}> */}
                            <Link href={`/login`}>
                                <a>
                                    <span className="icon">
                                        <i className="fas fa-blog" />
                                    </span>
                                    <div className="social__tooltip social__tooltip-bottom">
                                        Login
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Navigation;
