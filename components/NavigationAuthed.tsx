import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { edgeConfig } from "@ory/integrations/next";
import SessionContext from "../context/session-context";

function NavigationAuthed() {
    const router = useRouter();
    const { session } = useContext(SessionContext);
    const { pathname } = router;

    return (
        <div className="header-holder services-section text-center animate__animated animate__zoomIn">
            <div className="navigation">
                <ul className="nav">
                    <li className={`list ${pathname === "/home" ? "active" : ""}`}>
                        <Link href={`/home`}>
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
                    {session && (
                        <li
                            className={`list ${
                                pathname === "/customers" ? "active" : ""
                            }`}
                        >
                            <Link href={`/customers`}>
                                <a className="active">
                                    <span className="icon">
                                        <i className="fas fa-sitemap" />
                                    </span>
                                    <div className="social__tooltip social__tooltip-bottom">
                                        Danh sách đại lý
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )}
                    {session && (
                        <li
                            className={`list ${
                                pathname.includes("/wallet") ? "active" : ""
                            }`}
                        >
                            <Link href={`/wallet`}>
                                <a className="active">
                                    <span className="icon">
                                        <i className="fas fa-wallet" />
                                    </span>
                                    <div className="social__tooltip social__tooltip-bottom">
                                        Ví của tôi
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )}
                    {session && (
                        <li
                            className={`list ${
                                pathname === "/features" ? "active" : ""
                            }`}
                        >
                            <Link href={`/features`}>
                                <a className="active">
                                    <span className="icon">
                                        <i className="far fa-list-alt" />
                                    </span>
                                    <div className="social__tooltip social__tooltip-bottom">
                                        Danh sách tính năng
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )}
                    {session ? (
                        <li
                            className={`list ${
                                pathname.includes("/account") ? "active" : ""
                            }`}
                        >
                            {/* <Link href={edgeConfig.basePath + "/ui/login"}> */}
                            <Link href={`/account`}>
                                <a>
                                    <span className="icon">
                                        <i className="fas fa-user-circle" />
                                    </span>
                                    <div className="social__tooltip social__tooltip-bottom">
                                        Account
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
                                        <i className="fas fa-sign-in-alt" />
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

export default NavigationAuthed;
