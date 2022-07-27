import Head from "next/head";
import React from "react";
import LayoutAuthed from "../../components/LayoutAuthed";
import SectionLayout from "../../components/SectionLayout";

function Purchase() {
    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Nhập hàng</title>
            </Head>
            <SectionLayout>
                <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                    <h1 className="left-title">
                        Nhập <span>hàng</span>
                    </h1>
                    <div className="animated-bar left" />
                </div>
                <div className="section-products">
                    <div className="section-products-item">
                        <div className="section-products-item__thumbnail" >
                            <img src="https://i.pinimg.com/originals/d2/bc/2e/d2bc2e48daf3b728e0273427fc1f6cfd.jpg" />
                        </div>
                        <div className="section-products-item__content">
                            <div>
                                <div className="section-products-item__title">
                                    Thẻ smart card
                                </div>
                                <div className="section-products-item__description">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam dapibus ante erat,
                                    ut lacinia enim imperdiet vel.
                                </div>
                            </div>
                            <div className="section-products-item__price">
                                2,000,000đ
                            </div>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default Purchase;
