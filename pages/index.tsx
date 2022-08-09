import { useContext, useEffect, useState } from "react";
import {
    AiFillCheckCircle,
    AiFillCloseCircle,
    AiFillStar,
    AiOutlineBlock,
    AiOutlineDeliveredProcedure,
    AiOutlineMenu,
    AiOutlinePlayCircle,
    AiOutlinePullRequest,
    AiOutlineSchedule,
    AiOutlineUser,
} from "react-icons/ai";
import { CgPerformance } from "react-icons/cg";
import { FaFingerprint } from "react-icons/fa";
import { BsCodeSlash, BsShieldCheck } from "react-icons/bs";
import { NextPage } from "next";
import { Account } from "../types/global";
import { GET_CARD_BY_ORY_ID } from "../utils/apollo/queries/card.queries";
import { useLazyQuery } from "@apollo/client";
import { getDataGraphqlResult } from "../utils";
import SessionContext from "../context/session-context";
import Link from "next/link";
import { CenterLink } from "../pkg";
const Home: NextPage = () => {
    const [navbarActive, setNavbarActive] = useState<boolean>(false);
    const [headerActive, setHeaderActive] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>();
    const [getCardByOryId, { called, loading, data }] =
        useLazyQuery(GET_CARD_BY_ORY_ID);
    const { session, updateSession } = useContext(SessionContext);
    useEffect(() => {
        if (session) {
            getCardByOryId({
                variables: {
                    ory_id: session.identity.id,
                },
            });
        }
    }, [session]);
    useEffect(() => {
        if (data) {
            const cards = getDataGraphqlResult(data);
            if (cards && cards.length > 0) {
                setAccount(cards[0].account);
            }
        }
    }, [data]);
    console.log(account);
    return (
        <div
            className="home"
            onScroll={(e) => {
                e.currentTarget.scrollTop > 20
                    ? setHeaderActive(true)
                    : setHeaderActive(false);
            }}
        >
            <header>
                <div
                    className={`header__container ${
                        headerActive ? "active" : ""
                    }`}
                >
                    <div className="header__branch">SCard</div>

                    <ul className="header__items">
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Company</li>
                    </ul>
                    {account ? (
                        <Link href="/home" passHref>
                            <CenterLink>
                                <div className="account__name">
                                    <AiOutlineUser /> {account.name}
                                </div>
                            </CenterLink>
                        </Link>
                    ) : (
                        <Link href="/login" passHref>
                            <CenterLink>
                                <div className="account__name">Đăng nhập</div>
                                {/* <button className="btn__login header">Đăng nhập</button> */}
                            </CenterLink>
                        </Link>
                    )}

                    <div
                        className="header__toggler"
                        onClick={() => {
                            setNavbarActive((prep) => !prep);
                        }}
                    >
                        <AiOutlineMenu />
                    </div>
                </div>
                <div
                    className={`header__navbar ${navbarActive ? "active" : ""}`}
                >
                    <div className="navbar__branch">
                        SCard
                        <i
                            onClick={() => {
                                setNavbarActive((prep) => !prep);
                            }}
                        >
                            <AiFillCloseCircle />
                        </i>
                    </div>

                    <ul className="navbar__items">
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Company</li>
                    </ul>

                    <div className="navbar__btns">
                        {account ? (
                            <div className="account__name-navbar">
                                <AiOutlineUser />
                                <p className="account--name"> {account.name}</p>
                            </div>
                        ) : (
                            <Link href="/login" passHref>
                                <CenterLink>
                                    <button className="btn__login">
                                        Dang Nhap
                                    </button>
                                </CenterLink>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <main>
                <div className="hero">
                    <div className="hero__content">
                        <p className="content__title">
                            Get Fully Control and Visibility your Company
                        </p>
                        <p className="content__description">
                            Proactively coordinate quality quality vectors
                            vis-a-vis supply chains. Quickly engage
                            client-centric web services.
                        </p>
                        <div className="content__btns">
                            <button className="btn__request">
                                Request For Demo
                            </button>
                            <button className="btn__watch">
                                <AiOutlinePlayCircle size={40} /> Watch Video
                            </button>
                        </div>
                    </div>
                    <div className="hero__images">
                        <img
                            className="hero__image"
                            src="/images/hero-1.png"
                            alt=""
                        />
                    </div>
                </div>
                <div className="feature">
                    <p className="feature__title">
                        With all the Features You Need
                    </p>
                    <p className="feature__description">
                        Credibly grow premier ideas rather than
                        bricks-and-clicks strategic theme areas distributed for
                        stand-alone web-readiness.
                    </p>
                    <div className="feature__items">
                        <div>
                            <div className="performance">
                                <CgPerformance size={30} />
                            </div>
                            <p className="item__title">Good Performance</p>
                            <p className="item__description">
                                Appropriately grow competitive leadership rather
                                than strategic technically sound processes
                                without state.
                            </p>
                        </div>
                        <div>
                            <div className="secure">
                                <BsShieldCheck size={30} />
                            </div>
                            <p className="item__title">Highly Secure</p>
                            <p className="item__description">
                                Appropriately grow competitive leadership rather
                                than strategic technically sound processes
                                without state.
                            </p>
                        </div>
                        <div>
                            <div className="development">
                                <BsCodeSlash size={30} />
                            </div>
                            <p className="item__title">Fast Development</p>
                            <p className="item__description">
                                Appropriately grow competitive leadership rather
                                than strategic technically sound processes
                                without state.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="why-choose-us">
                    <div className="item1">
                        <div className="container">
                            <div className="left">
                                <div className="icon">
                                    <BsShieldCheck size={30} />
                                </div>
                                <p className="title">
                                    Advanced Analytics, Understand Business
                                </p>
                                <p className="description">
                                    Distinctively promote parallel vortals with
                                    ubiquitous e-markets. Proactively benchmark
                                    turnkey optimize next-generation strategic
                                    leadership without resource sucking ideas.
                                </p>
                                <div className="lists">
                                    <ul className="list1">
                                        <li>
                                            <AiFillCheckCircle />{" "}
                                            <p>Thought leadership</p>
                                        </li>
                                        <li>
                                            <AiFillCheckCircle />{" "}
                                            <p>Personal branding</p>
                                        </li>
                                        <li>
                                            <AiFillCheckCircle />{" "}
                                            <p>Modernized prospecting</p>
                                        </li>
                                    </ul>
                                    <ul className="list2">
                                        <li>
                                            <AiFillCheckCircle />{" "}
                                            <p>Better win rates</p>
                                        </li>
                                        <li>
                                            <AiFillCheckCircle />{" "}
                                            <p>Showcasing success</p>
                                        </li>
                                        <li>
                                            <AiFillCheckCircle />{" "}
                                            <p>Sales compliance</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="right">
                                <img src="/images/widget-11.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="item2">
                        <div className="left">
                            <div className="icon">
                                <FaFingerprint size={20} />
                            </div>
                            <p className="title">
                                Match Everything to Brand and Style
                            </p>
                            <p className="description">
                                Intrinsicly pontificate reliable metrics with
                                enabled. Holisticly maintain clicks-and-mortar
                                manufactured products empower viral customer
                                service through resource deliverables.
                            </p>
                            <p className="description">
                                Customer service through resource pontificate
                                reliable metrics with enabled expedite resource
                                maximizing information maintain manufactured
                                products.
                            </p>
                        </div>
                        <div className="right">
                            <img src="/images/widget-12.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="customer__review">
                    <div className="title">
                        <p className="title_primary">Testimonial</p>
                        What They Say About Us
                    </div>
                    <p className="description">
                        Uniquely promote adaptive quality vectors rather than
                        stand-alone e-markets. pontificate alternative
                        architectures whereas iterate.
                    </p>
                    <div className="quote">
                        <img src="/images/quotes-left.svg" alt="" />
                        <div className="title">
                            The Best Template You Got to Have it!
                        </div>
                        <div className="rating__list">
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                        </div>
                        <div className="quote__description">
                            Globally network long-term high-impact schemas
                            vis-a-vis distinctive e-commerce cross-media
                            infrastructures rather than ethical sticky
                            alignments rather than global. Plagiarize
                            technically sound total linkage for leveraged value
                            media web-readiness and premium processes.
                        </div>
                        <div className="author__infor">
                            <p className="author">Joe Richard</p>
                            <p className="career">Visual Designer</p>
                        </div>
                    </div>
                </div>
                <div className="work-process">
                    <div className="title">
                        <p className="title_primary">Process</p>
                        We Follow Our Work Process
                    </div>
                    <p className="description">
                        Enthusiastically engage cross-media leadership skills
                        for alternative experiences. Proactively drive vertical
                        systems than intuitive architectures.
                    </p>
                    <div className="step__container">
                        <div className="steps">
                            <div className="step">
                                <div className="step__icon">
                                    <i>
                                        <AiOutlineSchedule size={30} />
                                    </i>
                                </div>
                                <div className="step__content">
                                    <div className="title">
                                        <p className="title_primary">Step 1</p>
                                        Research and Content Planing
                                    </div>
                                    <p className="description">
                                        Progressively foster enterprise-wide
                                        systems whereas equity invested
                                        web-readiness harness installed base
                                        bandwidth.
                                    </p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step__icon">
                                    <i>
                                        <AiOutlinePullRequest size={30} />
                                    </i>
                                </div>
                                <div className="step__content">
                                    <div className="title">
                                        <p className="title_primary">Step 2</p>
                                        Publishing and Execution
                                    </div>
                                    <p className="description">
                                        Dramatically administrate progressive
                                        metrics without error-free globally
                                        simplify standardized alignments
                                        plagiarize distributed.
                                    </p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step__icon">
                                    <i>
                                        <AiOutlineBlock size={30} />
                                    </i>
                                </div>
                                <div className="step__content">
                                    <div className="title">
                                        <p className="title_primary">Step 3</p>
                                        Product Prototyping
                                    </div>
                                    <p className="description">
                                        Interactively whiteboard transparent
                                        testing procedures before
                                        bricks-and-clicks initiatives
                                        administrate competencies.
                                    </p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step__icon">
                                    <i>
                                        <AiOutlineDeliveredProcedure
                                            size={30}
                                        />
                                    </i>
                                </div>
                                <div className="step__content">
                                    <div className="title">
                                        <p className="title_primary">Step 4</p>
                                        Deliver the Final Product
                                    </div>
                                    <p className="description">
                                        Dramatically plagiarize distributed
                                        progressive metrics without error-free
                                        globally simplify standardized
                                        alignments.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="step__image">
                            <img src="/images/office-img-1.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div className="container">
                    <div className="footer__top">
                        <div className="header__branch">SCard</div>
                        <p>
                            Our latest news, articles, and resources, we will
                            sent to your inbox weekly.
                        </p>
                        <div className="form__input">
                            <input
                                type="text"
                                className="input-custom"
                                placeholder="Enter your email"
                            />
                            <button className="button-submit">Subscribe</button>
                        </div>
                        <div className="rating-block">
                            <p>10/10 Overall rating</p>
                            <div className="rating__list">
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                            </div>
                        </div>
                    </div>
                    <div className="footer__bottom">
                        <ul>
                            <li className="title">Primary Pages</li>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Career</li>
                            <li>Service</li>
                        </ul>
                        <ul>
                            <li className="title">Primary Pages</li>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Career</li>
                            <li>Service</li>
                        </ul>
                        <ul>
                            <li className="title">Primary Pages</li>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Career</li>
                            <li>Service</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
