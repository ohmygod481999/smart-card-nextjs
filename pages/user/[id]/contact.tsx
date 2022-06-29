import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

const Contact: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout id={id}>
            <section id="contact" className="section active">
                <div className="homecolor-box" />
                <div className="common_bg animate__animated animate__zoomIn">
                    <div className="container">
                        {/* Contact-page Start */}
                        <div className="contact-section">
                            {/* Contact-Section Title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                                        <p className="common-desctiption">
                                            Feel free to contact me anytimes
                                        </p>
                                        <h1 className="common-title">
                                            my <span>contact</span>
                                        </h1>
                                        <div className="animated-bar" />
                                    </div>
                                </div>
                            </div>
                            {/* Contact-Section Title End*/}
                            {/* Contact Form Start */}
                            <div className="contact-section">
                                <div className="row">
                                    {/* Contact form */}
                                    <div className="col-lg-7 col-12 ">
                                        <form
                                            className="contact-form animate__animated animate__fadeInLeft animate__delay-2s"
                                            id="contact-form"
                                        >
                                            <h4 className="content-title">
                                                contact me
                                            </h4>
                                            <div className="row">
                                                <div className="col-12 col-md-6 form-group">
                                                    <input
                                                        className="form-control"
                                                        id="contact-name"
                                                        type="text"
                                                        name="name"
                                                        placeholder="Name"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6 form-group">
                                                    <input
                                                        className="form-control"
                                                        id="contact-email"
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12 form-group">
                                                    <input
                                                        className="form-control"
                                                        id="contact-subject"
                                                        type="text"
                                                        name="subject"
                                                        placeholder="Subject"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12 form-group form-message">
                                                    <textarea
                                                        className="form-control"
                                                        id="contact-message"
                                                        name="message"
                                                        placeholder="Message"
                                                        rows={5}
                                                        required
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                <div className="col-12 mb-4 form-submit">
                                                    <button
                                                        className="clickbtn button-main button-scheme"
                                                        id="contact-submit"
                                                        type="submit"
                                                    >
                                                        Send Message
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/* Contact form End */}
                                    {/* Contact info */}
                                    <div className="col-lg-5 col-12 ">
                                        <div className="contact-info animate__animated animate__fadeInRight animate__delay-3s">
                                            <h4 className="content-title">
                                                Contact Info
                                            </h4>
                                            <p className="info-description">
                                                Always available for freelance
                                                work if the right project comes
                                                along, Feel free to contact me!
                                            </p>
                                            <ul
                                                className="list-unstyled list-info"
                                                style={{
                                                    display: "inline-grid",
                                                }}
                                            >
                                                <li>
                                                    <div className="media d-flex align-items-center">
                                                        <span className="info-icon">
                                                            <i className="fas fa-user-alt" />
                                                        </span>
                                                        <div className="media-body info-details">
                                                            <h6 className="info-type">
                                                                Name
                                                            </h6>
                                                            <span className="info-value">
                                                                Alex Smith
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media d-flex align-items-center">
                                                        <span className="info-icon">
                                                            <i className="fas fa-map-pin" />
                                                        </span>
                                                        <div className="media-body info-details">
                                                            <h6 className="info-type">
                                                                Location
                                                            </h6>
                                                            <span className="info-value">
                                                                4155 Mann
                                                                Island,
                                                                Liverpool,
                                                                United Kingdom.
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media d-flex align-items-center">
                                                        <span className="info-icon">
                                                            <i className="fas fa-phone-alt" />
                                                        </span>
                                                        <div className="media-body info-details">
                                                            <h6 className="info-type">
                                                                Call Me
                                                            </h6>
                                                            <span className="info-value">
                                                                <a href="tel:+441632967704">
                                                                    +44 1632
                                                                    967704
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="media d-flex align-items-center">
                                                        <span className="info-icon">
                                                            <i className="fas fa-envelope" />
                                                        </span>
                                                        <div className="media-body info-details">
                                                            <h6 className="info-type">
                                                                Email Me
                                                            </h6>
                                                            <span className="info-value">
                                                                <a href="mailto:Alex@example.com">
                                                                    Alex@example.com
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Social media icons*/}
                                        <div className="fixed-block d-flex animate__animated animate__jackInTheBox animate__delay-3s">
                                            <ul className="list-unstyled social-icons p-3">
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
                                    {/* Contact info End */}
                                </div>
                            </div>
                            {/* map */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="map animate__animated animate__fadeInRight animate__delay-4s">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19845.82732713224!2d-0.3162034543774074!3d51.55487883052924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876116207a6d0bd%3A0xaf7016a2cadb21e4!2sWembley%2C%20UK!5e0!3m2!1sen!2sin!4v1645179715804!5m2!1sen!2sin"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* map end */}
                            {/* Contact-Footer */}
                            <div className="row justify-content-center animate__animated animate__fadeInUp animate__delay-5s">
                                <div className="col-lg-6 text-center">
                                    <h5 className="footer">
                                        Copyright© &nbsp;
                                        <a> Avs Technolabs</a>&nbsp;&nbsp;
                                        <i className="fas fa-heart animate__animated animate__pulse animate__faster animate__infinite	infinite" />
                                        &nbsp;&nbsp;All rigths reserved
                                    </h5>
                                </div>
                            </div>
                            {/* Contact-Footer End */}
                        </div>
                        {/* Contact-page End */}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Contact;
