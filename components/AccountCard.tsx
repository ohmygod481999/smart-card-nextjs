import _ from "lodash";
import React from "react";
import { Account } from "../types/global";
import { defaultImg } from "../utils";

interface Props {
    account?: Account;
}

function AccountCard({ account }: Props) {
    return (
        <section id="home" className="section active">
            <div className="homecolor-box" />
            <div className="common_bg animate__animated animate__zoomIn">
                <div className="container m-auto">
                    <div className="row align-items-center">
                        {/* Profile-Pic */}
                        <div className=" col-xl-5 col-lg-6 col-md-6 col-12">
                            <div className="home-profile animate__animated animate__fadeInLeft animate__delay-1s">
                                <img
                                    src={account?.avatar || defaultImg}
                                    alt="home-profile"
                                />
                            </div>
                        </div>
                        {/* Profile-Pic End*/}
                        {/* Profile-Information */}
                        <div className="col-xl-7 col-lg-6 col-md-6 col-12">
                            <div className="home-content">
                                {/* <p className="common-desctiption animate__animated animate__fadeInDown animate__delay-1s">
                                        Get to know me
                                    </p> */}
                                <h1 className="common-title animate__animated animate__fadeInDown animate__delay-1s">
                                    {/* {getUserName(session?.identity) ||
                                            "Unknown"} */}
                                    {/* {_.get(traits, "email")} */}
                                    {_.get(account, "name")}
                                </h1>
                                <div className="animated-bar animate__animated animate__fadeInDown animate__delay-2s" />
                                <div className="animated-text animate__animated animate__fadeInDown animate__delay-2s">
                                    <h3>Web Developer</h3>
                                    <h3>UI - UX Designer</h3>
                                    <h3>Software Engineer</h3>
                                </div>
                                {/* Social media icons*/}
                                {/* <div className="fixed-block animate__animated animate__jackInTheBox animate__delay-2-5s">
                                        <ul className="list-unstyled social-icons">
                                            <li>
                                                <a href="javascript:void(0)">
                                                    <i className="fab fa-twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)">
                                                    <i className="fab fa-facebook-square " />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)">
                                                    <i className="fab fa-linkedin " />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)">
                                                    <i className="fab fa-github-square " />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)">
                                                    <i className="fab fa-instagram-square" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div> */}
                                <ul className="account-infor-list">
                                    <li>
                                        <a href="facebook.com">
                                            <div className="logo">
                                                <i className="fab fa-facebook-square " />{" "}
                                            </div>
                                            <div className="content">
                                                Facebook
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="instagram.com">
                                            <div className="logo">
                                                <i className="fab fa-instagram-square" />{" "}
                                            </div>
                                            <div className="content">
                                                Instagram
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="instagram.com">
                                            <div className="logo">
                                                <i className="far fa-envelope" />{" "}
                                            </div>
                                            <div className="content">
                                                {_.get(account, "email")}
                                            </div>
                                        </a>
                                    </li>
                                    {_.get(account, "phone") && (
                                        <li>
                                            <a
                                                href={`tel:${_.get(
                                                    account,
                                                    "phone"
                                                )}`}
                                            >
                                                <div className="logo">
                                                    <i className="fas fa-mobile"></i>{" "}
                                                </div>
                                                <div className="content">
                                                    {_.get(account, "phone")}
                                                </div>
                                            </a>
                                        </li>
                                    )}
                                </ul>
                                <p className="lorem-text animate__animated animate__zoomIn animate__delay-2-5s">
                                    {_.get(account, "description")}
                                </p>
                                {/* <div className="home-btn">
                                        <a
                                            href="#contact"
                                            data-section-index={1}
                                            className="clickbtn hire-me animate__animated animate__fadeInTopLeft animate__delay-3s "
                                        >
                                            Hire me
                                        </a>
                                        <a
                                            href="#about"
                                            data-section-index={1}
                                            className="clickbtn about-us animate__animated animate__fadeInTopRight animate__delay-3s"
                                        >
                                            about me{" "}
                                        </a>
                                    </div> */}
                            </div>
                        </div>
                        {/* Profile-Information End */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AccountCard;
