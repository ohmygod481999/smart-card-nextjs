import React from "react";

function CardDontExist() {
    return (
        <section className="section active">
            <div className="homecolor-box" />
            <div className="common_bg animate__animated animate__zoomIn">
                <div className="container m-auto">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="home-content">
                                <p className="common-desctiption animate__animated animate__fadeInDown animate__delay-1s">
                                    Thẻ không tồn tại
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

export default CardDontExist;
