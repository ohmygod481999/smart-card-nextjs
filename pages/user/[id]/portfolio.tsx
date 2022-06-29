import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

const Portfolio: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout id={id}>
            <section id="portfolio" className="section active">
                <div className="homecolor-box" />
                <div className="common_bg animate__animated animate__fadeInLeft">
                    <div className="container">
                        <div className="protfolio-section text-center  ">
                            {/* Protfolio-Title Start */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                                        <p className="common-desctiption">
                                            Showcasing some of my best work
                                        </p>
                                        <h1 className="common-title">
                                            My <span>Portfolio</span>
                                        </h1>
                                        <div className="animated-bar" />
                                    </div>
                                </div>
                            </div>
                            {/* Protfolio-Title Start */}
                            {/* Protfolio nav-button start  */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="portfolio-menu animate__animated animate__fadeInUp animate__delay-2s">
                                        <nav className="controls ">
                                            <button
                                                type="button"
                                                className="control clickbtn"
                                                data-filter="all"
                                            >
                                                All
                                            </button>
                                            <button
                                                type="button"
                                                className="control clickbtn"
                                                data-filter=".webdevelopment "
                                            >
                                                WebDevelopment
                                            </button>
                                            <button
                                                type="button"
                                                className="control clickbtn"
                                                data-filter=".webdesign "
                                            >
                                                Web Design
                                            </button>
                                            <button
                                                type="button"
                                                className="control clickbtn"
                                                data-filter=".graphic "
                                            >
                                                Graphic Design
                                            </button>
                                            <button
                                                type="button"
                                                className="control clickbtn"
                                                data-filter=".uiuxdesign "
                                            >
                                                UI-UX Design
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            {/* Protfolio nav-button End  */}
                            {/* Portfolio Mix Content Start */}
                            <div className="row portfolio-list animate__zoomIn animate__animated animate__delay-3s">
                                <div className="container">
                                    <ul className="row ps-0">
                                        {/* Mix Content-Box */}
                                        <li className="mix webdevelopment col-xl-3 col-lg-4 col-md-6">
                                            <a
                                                title="click to zoom-in"
                                                href="/images/protfolio/item-1.jpg"
                                                data-caption="Web Development"
                                                data-size="1200x600"
                                            >
                                                <img
                                                    src="/images/protfolio/item-1.jpg"
                                                    alt="Image description"
                                                />
                                                <div className="info">
                                                    <h3 className="title">
                                                        Web Develoment
                                                    </h3>
                                                    <span className="post">
                                                        project
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        {/* Mix Content-Box */}
                                        <li className="mix webdesign col-xl-3 col-lg-4 col-md-6">
                                            <a
                                                title="click to zoom-in"
                                                href="/images/protfolio/item-2.jpg"
                                                data-caption="Web Design"
                                                data-size="1200x600"
                                            >
                                                <img
                                                    src="/images/protfolio/item-2.jpg"
                                                    alt="Image description"
                                                />
                                                <div className="info">
                                                    <h3 className="title">
                                                        Web Design
                                                    </h3>
                                                    <span className="post">
                                                        project
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        {/* Mix Content Box */}
                                        <li className="mix uiuxdesign col-xl-3 col-lg-4 col-md-6">
                                            <a
                                                title="click to zoom-in"
                                                href="/images/protfolio/item-3.jpg"
                                                data-caption="UI-UX Design"
                                                data-size="1200x600"
                                            >
                                                <img
                                                    src="/images/protfolio/item-3.jpg"
                                                    alt="Image description"
                                                />
                                                <div className="info">
                                                    <h3 className="title">
                                                        UI-UX Design
                                                    </h3>
                                                    <span className="post">
                                                        project
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        {/* Mix Content Box */}
                                        <li className="mix webdevelopment col-xl-3 col-lg-4 col-md-6">
                                            <a
                                                title="click to zoom-in"
                                                href="/images/protfolio/item-4.jpg"
                                                data-caption="Web Development"
                                                data-size="1200x600"
                                            >
                                                <img
                                                    src="/images/protfolio/item-4.jpg"
                                                    alt="Image description"
                                                />
                                                <div className="info">
                                                    <h3 className="title">
                                                        Web Develoment
                                                    </h3>
                                                    <span className="post">
                                                        project
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        {/* Mix Content Box */}
                                        <li className="mix webdesign col-xl-3 col-lg-4 col-md-6">
                                            <a
                                                title="click to zoom-in"
                                                href="/images/protfolio/item-5.jpg"
                                                data-caption="Web Design"
                                                data-size="1200x600"
                                            >
                                                <img
                                                    src="/images/protfolio/item-5.jpg"
                                                    alt="Image description"
                                                />
                                                <div className="info">
                                                    <h3 className="title">
                                                        Web Design
                                                    </h3>
                                                    <span className="post">
                                                        project
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        {/* Mix Content Box */}
                                        <li className="mix graphic col-xl-3 col-lg-4 col-md-6">
                                            <a
                                                title="click to zoom-in"
                                                href="/images/protfolio/item-6.jpg"
                                                data-caption="Graphic Design"
                                                data-size="1200x600"
                                            >
                                                <img
                                                    src="/images/protfolio/item-6.jpg"
                                                    alt="Image description"
                                                />
                                                <div className="info">
                                                    <h3 className="title">
                                                        Graphic Design
                                                    </h3>
                                                    <span className="post">
                                                        project
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        {/* Mix Content Box */}
                                        <li className="mix uiuxdesign col-xl-3 col-lg-4 col-md-6">
                                            <a
                                                title="click to zoom-in"
                                                href="/images/protfolio/item-7.jpg"
                                                data-caption="UI-UX Design"
                                                data-size="1200x600"
                                            >
                                                <img
                                                    src="/images/protfolio/item-7.jpg"
                                                    alt="Image description"
                                                />
                                                <div className="info">
                                                    <h3 className="title">
                                                        UI-UX Design
                                                    </h3>
                                                    <span className="post">
                                                        project
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        {/* Mix Content Box */}
                                        <li className="mix graphic col-xl-3 col-lg-4 col-md-6">
                                            <a
                                                title="click to zoom-in"
                                                href="/images/protfolio/item-8.jpg"
                                                data-caption="Graphic Design"
                                                data-size="1200x600"
                                            >
                                                <img
                                                    src="/images/protfolio/item-8.jpg"
                                                    alt="Image description"
                                                />
                                                <div className="info">
                                                    <h3 className="title">
                                                        Graphic Design
                                                    </h3>
                                                    <span className="post">
                                                        project
                                                    </span>
                                                </div>
                                            </a>
                                        </li>
                                        {/* Mix Content Box */}
                                    </ul>
                                </div>
                            </div>
                            {/* Portfolio Mix Content End */}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Portfolio;
