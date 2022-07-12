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
                                    {_.get(account, "name")}{" "}
                                    {_.get(account, "is_agency") && (
                                        <i
                                            style={{
                                                color: "khaki",
                                            }}
                                            data-tip="Đại lý chính thức"
                                            className="far fa-star"
                                        ></i>
                                    )}
                                </h1>
                                <div className="animated-bar animate__animated animate__fadeInDown animate__delay-2s" />
                                <div className="animated-text animate__animated animate__fadeInDown animate__delay-2s">
                                    {_.get(account, "slide_text") &&
                                        _.get(account, "slide_text")
                                            ?.split(",")
                                            .map((text, i) => (
                                                <h3 key={i}>{text.trim()}</h3>
                                            ))}
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
                                <ul className="account-infor-list animate__animated animate__fadeInDown animate__delay-1s">
                                    {_.get(account, "facebook") && (
                                        <li>
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={_.get(
                                                    account,
                                                    "facebook"
                                                )}
                                            >
                                                <div className="logo">
                                                    <i className="fab fa-facebook-square " />{" "}
                                                </div>
                                                <div className="content">
                                                    Facebook
                                                </div>
                                            </a>
                                        </li>
                                    )}
                                    {_.get(account, "zalo") && (
                                        <li>
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={`https://zalo.me/${_.get(
                                                    account,
                                                    "zalo"
                                                )}`}
                                            >
                                                <div className="logo">
                                                    <i className="fas fa-phone" />{" "}
                                                </div>
                                                <div className="content">
                                                    Zalo
                                                </div>
                                            </a>
                                        </li>
                                    )}
                                    {/* <li>
                                        <a href="instagram.com">
                                            <div className="logo">
                                                <i className="fab fa-instagram-square" />{" "}
                                            </div>
                                            <div className="content">
                                                Instagram
                                            </div>
                                        </a>
                                    </li> */}
                                    {_.get(account, "email") && (
                                        <li>
                                            <a
                                                href={`mailto:${_.get(
                                                    account,
                                                    "email"
                                                )}`}
                                            >
                                                <div className="logo">
                                                    <i className="far fa-envelope" />{" "}
                                                </div>
                                                <div className="content">
                                                    {_.get(account, "email")}
                                                </div>
                                            </a>
                                        </li>
                                    )}
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
