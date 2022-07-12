import React from "react";

interface Props {
    children: React.ReactNode;
}

function SectionLayout(props: Props) {
    const { children } = props;
    return (
        <section id="about" className="section active">
            <div className="homecolor-box" />
            <div className="common_bg animate__animated animate__fadeInDown">
                <div className="container">
                    <div className="about-content">{children}</div>
                </div>
            </div>
        </section>
    );
}

export default SectionLayout;
