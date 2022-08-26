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
                    <div className="header__branch">Smartcard</div>

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
                                <Link href="/home">
                                    <a className="account--name">
                                        {" "}
                                        {account.name}
                                    </a>
                                </Link>
                            </div>
                        ) : (
                            <Link href="/login" passHref>
                                <CenterLink>
                                    <button className="btn__login">
                                        Đăng nhập
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
                            Smartcard - Hệ sinh thái thông minh
                        </p>
                        <p className="content__description">
                            Smart card là thẻ thông minh cho cá nhân và doanh
                            nghiệp tiện lợi chia sẻ thông tin cho khách hàng cá
                            nhân và tích hợp quản trị doanh nghiệp
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
                            src="/images/connect.png"
                            alt=""
                        />
                    </div>
                </div>
                <div className="feature">
                    <p className="feature__title">Điểm nổi bật của Smartcard</p>
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
                            <p className="item__title">
                                Chia sẻ thông tin 1 chạm
                            </p>
                            <p className="item__description">
                                Chỉ với một thao tác chạm, smartcard có thể chia
                                sẻ một cách đầy đủ và chuyên nghiệp các thông
                                tin bạn có, thay thế hoàn toàn cho card visit.
                            </p>
                        </div>
                        <div>
                            <div className="secure">
                                <BsShieldCheck size={30} />
                            </div>
                            <p className="item__title">
                                Tích hợp quản trị doanh nghiệp
                            </p>
                            <p className="item__description">
                                Bạn là chủ doanh nghiệp ? Smart card tích hợp
                                sẵn hệ thống ERP chuyên nghiệp. Quản trị nhà
                                hàng, quản trị nhân viên, quản trị bán hàng,...
                            </p>
                        </div>
                        <div>
                            <div className="development">
                                <BsCodeSlash size={30} />
                            </div>
                            <p className="item__title">
                                Hệ sinh thái thông minh
                            </p>
                            <p className="item__description">
                                Với smartcard, bạn được tham gia hoàn toàn các
                                tiện ích từ hệ sinh thái smartcard như
                                smartmart, smartschool, ...
                            </p>
                        </div>
                    </div>
                </div>
                <div className="why-choose-us">
                    <div className="item1">
                        <div className="item1-container">
                            <div className="left">
                                <div className="icon">
                                    <BsShieldCheck size={30} />
                                </div>
                                <p className="title">
                                    Chia sẻ thông tin dễ dàng
                                </p>
                                <p className="description">
                                    Thẻ smartcard là thẻ cứng có tích hợp chip
                                    NFC thông minh, thiết kế với phong cách
                                    chuyên nghiệp, hiện đại, cho phép người dùng
                                    mang theo mọi nơi để chia sẻ thông tin của
                                    mình
                                </p>
                                <div className="lists">
                                    <ul className="list1">
                                        <li>
                                            <AiFillCheckCircle />{" "}
                                            <p>
                                                Thông tin cá nhân: Số điện
                                                thoại, email, website,...
                                            </p>
                                        </li>
                                        <li>
                                            <AiFillCheckCircle />{" "}
                                            <p>
                                                Thông tin các nền tảng mạng xã
                                                hội
                                            </p>
                                        </li>
                                        <li>
                                            <AiFillCheckCircle />{" "}
                                            <p>
                                                Thông tin của shop: Smartmart
                                            </p>
                                        </li>
                                        <li>
                                            <AiFillCheckCircle />{" "}
                                            <p>
                                                Truyền thông thương hiệu, cũng
                                                như hình ảnh cá nhân một cách
                                                chuyên nghiệp
                                            </p>
                                        </li>
                                    </ul>
                                    {/* <ul className="list2">
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
                                    </ul> */}
                                </div>
                            </div>
                            <div className="right">
                                <img
                                    src="/images/social-media-social.png"
                                    alt=""
                                />
                                {/* <img src="/images/widget-11.png" alt="" /> */}
                            </div>
                        </div>
                    </div>
                    <div className="item2">
                        <div className="left">
                            <div className="icon">
                                <FaFingerprint size={20} />
                            </div>
                            <p className="title">
                                Tích hợp hệ thống quản trị doanh nghiệp
                            </p>
                            <p className="description">
                                Là giải pháp ERP dành cho doanh nghiệp sản xuất
                                vừa và nhỏ, Smartcard ERP lưu trữ tập trung các
                                cơ sở dữ liệu và nguồn lực để tự động hóa và tối
                                ưu khâu quản lý và kế toán quản trị.
                            </p>
                            {/* <p className="description">
                                Customer service through resource pontificate
                                reliable metrics with enabled expedite resource
                                maximizing information maintain manufactured
                                products.
                            </p> */}
                        </div>
                        <div className="right">
                            <img src="/images/widget-12.png" alt="" />
                        </div>
                    </div>
                </div>
                {/* <div className="customer__review">
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
                </div> */}
                <div className="work-process">
                    <div className="title">
                        <p className="title_primary">Process</p>
                        Cách thức sử dụng
                    </div>
                    <p className="description">How to use.</p>
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
                                        Đặt hàng tại website
                                    </div>
                                    <p className="description">
                                        {/* Progressively foster enterprise-wide
                                        systems whereas equity invested
                                        web-readiness harness installed base
                                        bandwidth. */}
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
                                        Nhận thẻ tại nhà
                                    </div>
                                    {/* <p className="description">
                                        Dramatically administrate progressive
                                        metrics without error-free globally
                                        simplify standardized alignments
                                        plagiarize distributed.
                                    </p> */}
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
                                        Kích hoạt thẻ
                                    </div>
                                    {/* <p className="description">
                                        Interactively whiteboard transparent
                                        testing procedures before
                                        bricks-and-clicks initiatives
                                        administrate competencies.
                                    </p> */}
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
                                        Tùy biến thông tin cá nhân và sẵn sàng
                                        sử dụng
                                    </div>
                                    {/* <p className="description">
                                        Dramatically plagiarize distributed
                                        progressive metrics without error-free
                                        globally simplify standardized
                                        alignments.
                                    </p> */}
                                </div>
                            </div>
                        </div>
                        <div className="step__image">
                            <img src="/images/design.png" alt="" />
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div className="container">
                    <div className="footer__top">
                        <div className="header__branch">Smartcard</div>
                        <p>
                            Đăng ký để nhận thêm thông tin từ chúng tôi.
                        </p>
                        <div className="form__input">
                            <input
                                type="text"
                                className="input-custom"
                                placeholder="Nhập email của bạn"
                            />
                            <button className="button-submit">Gửi</button>
                        </div>
                        {/* <div className="rating-block">
                            <p>10/10 Overall rating</p>
                            <div className="rating__list">
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                            </div>
                        </div> */}
                    </div>
                    <div className="footer__bottom">
                        {/* <ul>
                            <li className="title">Primary Pages</li>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Career</li>
                            <li>Service</li>
                        </ul> */}
                        {/* <ul>
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
                        </ul> */}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
