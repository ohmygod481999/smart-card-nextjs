import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

const About: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout id={id}>
            <section id="about" className="section active">
                <div className="homecolor-box" />
                <div className="common_bg animate__animated animate__fadeInDown">
                    <div className="container">
                        <div className="about-content">
                            {/* About Title Start*/}
                            <div className="row ">
                                <div className="col-12 ">
                                    <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                                        <p className="common-desctiption">
                                            my intro
                                        </p>
                                        <h1 className="common-title">
                                            About <span>Me</span>
                                        </h1>
                                        <div className="animated-bar" />
                                    </div>
                                </div>
                            </div>
                            {/* About Title End */}
                            {/* About-Me */}
                            <div className="row single-section">
                                <div className="col-lg-4 profile-photo animate__animated animate__fadeInLeft animate__delay-2s ">
                                    <div className="row">
                                        <div className="col-12 d-block col-sm-none">
                                            <img
                                                src="/images/profile/simple.jpg"
                                                className="img-fluid main-img-mobile"
                                                alt="my picture"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-sm-12">
                                    <div className="row personal-info animate__animated animate__fadeInRight animate__delay-2s">
                                        <div className="col-12">
                                            <h5 className="personal-title">
                                                who am <span>i ?</span>
                                            </h5>
                                            <h3 className="personal-title">
                                                Im Alex Smith, a visual{" "}
                                                <span>UX/UI Designer</span> and{" "}
                                                <span>Web Developer</span>
                                            </h3>
                                            <p className="info">
                                                I am a freelancer based in the
                                                United Kingdom and i have been
                                                building noteworthy UX/UI
                                                designs and websites for years,
                                                which comply with the latest
                                                design trends. I help convert a
                                                vision and an idea into
                                                meaningful and useful products.
                                                Having a sharp eye for product
                                                evolution helps me prioritize
                                                tasks, iterate fast and deliver
                                                faster.
                                            </p>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-lg-12">
                                                <h3 className="personal-infotitle">
                                                    personal{" "}
                                                    <span>informations</span>
                                                </h3>
                                            </div>
                                            <div className="col-lg-6">
                                                <ul className="about-you ">
                                                    <li>
                                                        <span className="title">
                                                            first name :
                                                        </span>
                                                        <span className="value">
                                                            Alex
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="title">
                                                            last name :
                                                        </span>
                                                        <span className="value">
                                                            Smith
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="title">
                                                            address :
                                                        </span>
                                                        <span className="value">
                                                            98 Some Street, Some
                                                            Town
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="title">
                                                            From :
                                                        </span>
                                                        <span className="value">
                                                            San Francisco, USA
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="title">
                                                            Age :
                                                        </span>
                                                        <span className="value">
                                                            24 years
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-6">
                                                <ul className="about-you ">
                                                    <li>
                                                        <span className="title">
                                                            E-mail :
                                                        </span>
                                                        <span className="value">
                                                            <a href="mailto:info@example.com">
                                                                info@example.com
                                                            </a>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="title">
                                                            Phone :
                                                        </span>
                                                        <span className="value">
                                                            <a href="tel:(+01)123-456-789">
                                                                (+01)
                                                                123-456-789
                                                            </a>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="title">
                                                            skype :
                                                        </span>
                                                        <span className="value">
                                                            steve.milner
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="title">
                                                            Langages :
                                                        </span>
                                                        <span className="value">
                                                            English, German
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="title">
                                                            Freelance :
                                                        </span>
                                                        <span className="value">
                                                            {" "}
                                                            Available
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="About-btn">
                                                    <button
                                                        id="b1"
                                                        className="clickbtn download-cv"
                                                    >
                                                        Download CV{" "}
                                                        <i
                                                            className="fa fa-download"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                    {/* Social media icons*/}
                                                    <div className="col-lg-7 col-sm-6 col-12">
                                                        <ul className="list-unstyled social-icons">
                                                            <li>
                                                                <a href="javascript:void(0)">
                                                                    <i className="fab fa-twitter" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0)">
                                                                    <i className="fab fa-facebook-square" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0)">
                                                                    <i className="fab fa-linkedin" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0)">
                                                                    <i className="fab fa-github-square" />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0)">
                                                                    <i className="fab fa-instagram-square" />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* About-Me End */}
                            {/* Resume section Start */}
                            <div className="resume-section ">
                                {/* Resume title*/}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="section-title animate__animated animate__fadeInUp animate__delay-3s">
                                            <p className="common-desctiption">
                                                Check out my Resume
                                            </p>
                                            <h1 className="common-title ">
                                                my <span>Resume</span>
                                            </h1>
                                            <div className="animated-bar " />
                                        </div>
                                    </div>
                                </div>
                                {/* Resume title End*/}
                                {/* Resume Content */}
                                <div className="row">
                                    {/* Education part*/}
                                    <div className="col-md-6 col-12 ">
                                        <div className=" col-block education ">
                                            <h3 className="about-subtitle">
                                                Education
                                            </h3>
                                            <div className="resume-item">
                                                <span className="item-arrow" />
                                                <h5 className="item-title">
                                                    Bachelor of Science in
                                                    Information Technology
                                                </h5>
                                                <span className="item-details">
                                                    Cambridge University / 2004
                                                    - 2007
                                                </span>
                                                <p className="item-description">
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit. Optio quo repudiandae.
                                                </p>
                                            </div>
                                            <div className="resume-item">
                                                <span className="item-arrow" />
                                                <h5 className="item-title">
                                                    Master of Science in
                                                    Information Technology
                                                </h5>
                                                <span className="item-details">
                                                    Cambridge University / 2007
                                                    - 2009
                                                </span>
                                                <p className="item-description">
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit. Optio quo repudiandae.
                                                </p>
                                            </div>
                                            <div className="resume-item">
                                                <span className="item-arrow" />
                                                <h5 className="item-title">
                                                    Diploma In Web Design
                                                </h5>
                                                <span className="item-details">
                                                    Cambridge University / 2009
                                                    - 2010
                                                </span>
                                                <p className="item-description">
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit. Optio quo repudiandae.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Experience part*/}
                                    <div className="col-md-6 col-12 ">
                                        <div className=" col-block education">
                                            <h3 className="about-subtitle">
                                                Experience
                                            </h3>
                                            <div className="resume-item">
                                                <span className="item-arrow" />
                                                <h5 className="item-title">
                                                    Lead Ui/Ux Designer
                                                </h5>
                                                <span className="item-details">
                                                    Google / 2016 - Current
                                                </span>
                                                <p className="item-description">
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit. Optio quo repudiandae.
                                                </p>
                                            </div>
                                            <div className="resume-item">
                                                <span className="item-arrow" />
                                                <h5 className="item-title">
                                                    Senior Ui/Ux Designer
                                                </h5>
                                                <span className="item-details">
                                                    Adobe / 2013 - 2016
                                                </span>
                                                <p className="item-description">
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit. Optio quo repudiandae.
                                                </p>
                                            </div>
                                            <div className="resume-item">
                                                <span className="item-arrow" />
                                                <h5 className="item-title">
                                                    Junior Ui/Ux Designer
                                                </h5>
                                                <span className="item-details">
                                                    Google / 2011 - 2013
                                                </span>
                                                <p className="item-description">
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipisicing
                                                    elit. Optio quo repudiandae.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Resume ContentEnd */}
                            </div>
                            {/* / Resume section End*/}
                            {/* Skill Bar Section */}
                            <div className="skill-section">
                                <div className="row">
                                    <div className="col-12 ">
                                        <div className="section-title animate__animated animate__fadeInUp animate__delay-3s">
                                            <p className="common-desctiption">
                                                My level of knowledge in some
                                                tools
                                            </p>
                                            <h1 className="common-title">
                                                my <span>skills</span>
                                            </h1>
                                            <div className="animated-bar" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 ">
                                        <h3 className="about-subtitle">
                                            Design <span>Skills</span>
                                        </h3>
                                        <div className="skill-bars">
                                            <div className="bar">
                                                <div className="info">
                                                    <span>Photoshop</span>
                                                </div>
                                                <div className="progress-line Photoshop">
                                                    <span />
                                                </div>
                                            </div>
                                            <div className="bar">
                                                <div className="info">
                                                    <span>Illustrator</span>
                                                </div>
                                                <div className="progress-line Illustrator">
                                                    <span />
                                                </div>
                                            </div>
                                            <div className="bar">
                                                <div className="info">
                                                    <span>Figma</span>
                                                </div>
                                                <div className="progress-line Figma">
                                                    <span />
                                                </div>
                                            </div>
                                            <div className="bar">
                                                <div className="info">
                                                    <span>Indesign</span>
                                                </div>
                                                <div className="progress-line Indesign">
                                                    <span />
                                                </div>
                                            </div>
                                            <div className="bar">
                                                <div className="info">
                                                    <span>Sketch</span>
                                                </div>
                                                <div className="progress-line Sketch">
                                                    <span />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 ">
                                        <h3 className="about-subtitle">
                                            Coding <span>Skills</span>
                                        </h3>
                                        <div className="skill-bars">
                                            <div className="bar">
                                                <div className="info">
                                                    <span>HTML</span>
                                                </div>
                                                <div className="progress-line html">
                                                    <span />
                                                </div>
                                            </div>
                                            <div className="bar">
                                                <div className="info">
                                                    <span>CSS</span>
                                                </div>
                                                <div className="progress-line css">
                                                    <span />
                                                </div>
                                            </div>
                                            <div className="bar">
                                                <div className="info">
                                                    <span>jQuery</span>
                                                </div>
                                                <div className="progress-line jquery">
                                                    <span />
                                                </div>
                                            </div>
                                            <div className="bar">
                                                <div className="info">
                                                    <span>Python</span>
                                                </div>
                                                <div className="progress-line python">
                                                    <span />
                                                </div>
                                            </div>
                                            <div className="bar">
                                                <div className="info">
                                                    <span>MySQL</span>
                                                </div>
                                                <div className="progress-line mysql">
                                                    <span />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* / Skill Bar Section */}
                            {/* service section  */}
                            <div className="services-section text-center ">
                                <div className="row ">
                                    <div className="col-12">
                                        <div className="section-title  animate__animated animate__fadeInUp animate__slower animate__delay-3s ">
                                            <p className="common-desctiption">
                                                Services i offer to my clients
                                            </p>
                                            <h1 className="common-title">
                                                My <span>Services</span>
                                            </h1>
                                            <div className="animated-bar" />
                                        </div>
                                        <p className="service-text">
                                            Lorem Ipsum is simply dummy text of
                                            the printing and type setting
                                            industry. Lorem Ipsum has been the
                                            industrys
                                            <br />
                                            standard dummy text ever since the
                                            1500s, when an unknown book.
                                        </p>
                                    </div>
                                </div>
                                <div className="row animate__animated animate__zoomIn animate__slower animate__delay-3s">
                                    {/* Single Item */}
                                    <div className="col-lg-3 col-sm-6 services-box animate__animated animate__zoomIn animate__slower animate__delay-3s">
                                        <div className="service-item">
                                            <i className="fas fa-laptop-code" />
                                            <h4>
                                                <span className="service-line">
                                                    web design
                                                </span>
                                            </h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text
                                                of the printing and typesetting
                                                industry.
                                            </p>
                                        </div>
                                    </div>
                                    {/* End Single Item */}
                                    {/* Single Item */}
                                    <div className="col-lg-3 col-sm-6 services-box animate__animated animate__zoomIn animate__slower animate__delay-3s">
                                        <div className="service-item">
                                            <i className="fas fa-palette" />
                                            <h4>
                                                <span className="service-line">
                                                    design
                                                </span>
                                            </h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text
                                                of the printing and typesetting
                                                industry.
                                            </p>
                                        </div>
                                    </div>
                                    {/* End Single Item */}
                                    {/* Single Item */}
                                    <div className="col-lg-3 col-sm-6 services-box animate__animated animate__zoomIn animate__slower animate__delay-3s">
                                        <div className="service-item">
                                            <i className="fas fa-object-ungroup" />
                                            <h4>
                                                <span className="service-line">
                                                    product design
                                                </span>
                                            </h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text
                                                of the printing and typesetting
                                                industry.
                                            </p>
                                        </div>
                                    </div>
                                    {/* End Single Item */}
                                    {/* Single Item */}
                                    <div className="col-lg-3 col-sm-6 services-box animate__animated animate__zoomIn animate__slower animate__delay-3s">
                                        <div className="service-item">
                                            <i className="far fa-object-ungroup" />
                                            <h4>
                                                <span className="service-line">
                                                    UI/UX design
                                                </span>
                                            </h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text
                                                of the printing and typesetting
                                                industry.
                                            </p>
                                        </div>
                                    </div>
                                    {/* End Single Item */}
                                    {/* Single Item */}
                                    <div className="col-lg-3 col-sm-6 services-box animate__animated animate__zoomIn animate__slower animate__delay-3s">
                                        <div className="service-item">
                                            <i className="fas fa-radiation" />
                                            <h4>
                                                <span className="service-line">
                                                    animation
                                                </span>
                                            </h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text
                                                of the printing and typesetting
                                                industry.
                                            </p>
                                        </div>
                                    </div>
                                    {/* End Single Item */}
                                    {/* Single Item */}
                                    <div className="col-lg-3 col-sm-6 services-box animate__animated animate__zoomIn animate__slower animate__delay-3s">
                                        <div className="service-item">
                                            <i className="fas fa-code" />
                                            <h4>
                                                <span className="service-line">
                                                    web devolopment
                                                </span>
                                            </h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text
                                                of the printing and typesetting
                                                industry.
                                            </p>
                                        </div>
                                    </div>
                                    {/* End Single Item */}
                                    {/* Single Item */}
                                    <div className="col-lg-3 col-sm-6 services-box animate__animated animate__zoomIn animate__slower animate__delay-3s">
                                        <div className="service-item">
                                            <i className="fas fa-arrows-alt" />
                                            <h4>
                                                <span className="service-line">
                                                    fully responsive
                                                </span>
                                            </h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text
                                                of the printing and typesetting
                                                industry.
                                            </p>
                                        </div>
                                    </div>
                                    {/* End Single Item */}
                                    {/* Single Item */}
                                    <div className="col-lg-3 col-sm-6 services-box animate__animated animate__zoomIn animate__slower animate__delay-3s">
                                        <div className="service-item">
                                            <i className="fas fa-dharmachakra" />
                                            <h4>
                                                <span className="service-line">
                                                    management
                                                </span>
                                            </h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text
                                                of the printing and typesetting
                                                industry.
                                            </p>
                                        </div>
                                    </div>
                                    {/* End Single Item */}
                                </div>
                            </div>
                            {/* / service section */}
                            {/* Testimonials */}
                            <div className="row">
                                <div className="col-12 animate__animated animate__fadeInDown animate__delay-3s">
                                    <div className="section-title">
                                        <p className="common-desctiption">
                                            what our clients say
                                        </p>
                                        <h1 className="common-title">
                                            My<span>Testimonial</span>
                                        </h1>
                                        <div className="animated-bar" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    id="testimonial"
                                    className="owl-carousel owl-theme"
                                >
                                    <div className="item">
                                        <div className="testimonial-item">
                                            <div className="quote">
                                                <i className="fas fa-quote-left" />
                                            </div>
                                            <div className="testimonial-img">
                                                <img
                                                    src="/images/profile/glitch.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Dicta consequatur, optio dolores
                                                aliquid{" "}
                                            </p>
                                            <div className="rating">
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="testimonial-item">
                                            <div className="quote">
                                                <i className="fas fa-quote-left" />
                                            </div>
                                            <div className="testimonial-img">
                                                <img
                                                    src="/images/profile/partical.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Dicta consequatur, optio dolores
                                                aliquid{" "}
                                            </p>
                                            <div className="rating">
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="testimonial-item">
                                            <div className="quote">
                                                <i className="fas fa-quote-left" />
                                            </div>
                                            <div className="testimonial-img">
                                                <img
                                                    src="/images/profile/simple.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Dicta consequatur, optio dolores
                                                aliquid{" "}
                                            </p>
                                            <div className="rating">
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="testimonial-item">
                                            <div className="quote">
                                                <i className="fas fa-quote-left" />
                                            </div>
                                            <div className="testimonial-img">
                                                <img
                                                    src="/images/profile/water.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Dicta consequatur, optio dolores
                                                aliquid{" "}
                                            </p>
                                            <div className="rating">
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="testimonial-item">
                                            <div className="quote">
                                                <i className="fas fa-quote-left" />
                                            </div>
                                            <div className="testimonial-img">
                                                <img
                                                    src="/images/profile/wrap.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <p>
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Dicta consequatur, optio dolores
                                                aliquid{" "}
                                            </p>
                                            <div className="rating">
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                                <i className="fas fa-3x fa-star" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Testimonials section */}
                            {/* Fun Fact Section */}
                            <div className="funfacts-section">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="section-title">
                                            <p className="common-desctiption">
                                                This are my strongest sides
                                            </p>
                                            <h1 className="common-title">
                                                fun <span>facts</span>
                                            </h1>
                                            <div className="animated-bar" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <div className="funfacts-box">
                                            <h3
                                                className="counter"
                                                data-to={10}
                                                data-time={10000}
                                            >
                                                0
                                            </h3>
                                            <p className="fun-text">
                                                years of <span>experience</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="funfacts-box">
                                            <h3
                                                className="counter"
                                                data-to={499}
                                                data-time={100000}
                                            >
                                                0
                                            </h3>
                                            <p className="fun-text">
                                                happy Clients
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="funfacts-box">
                                            <h3
                                                className="counter"
                                                data-to={101}
                                                data-time={100000}
                                            >
                                                0
                                            </h3>
                                            <p className="fun-text">
                                                completed projects
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <div className="funfacts-box">
                                            <h3
                                                className="counter"
                                                data-to={20}
                                                data-time={10000}
                                            >
                                                0
                                            </h3>
                                            <p className="fun-text">
                                                awards win
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default About;
