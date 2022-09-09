import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import LayoutAuthed from "../components/LayoutAuthed";
import SectionLayout from "../components/SectionLayout";

enum FeatureTab {
    INDIVIDUAL,
    ENTERPRISE,
}

function Features() {
    const [tab, setTab] = useState<FeatureTab>(FeatureTab.INDIVIDUAL);

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - danh sách tính năng</title>
            </Head>
            <SectionLayout>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                            <h1 className="left-title">
                                Danh sách <span>tính năng</span>
                            </h1>
                            <div className="animated-bar left" />
                        </div>
                        <div className="section-features animate__animated animate__fadeInDown animate__delay-1s">
                            <div className="section-features__tabs">
                                <div
                                    className={`section-features__tab ${
                                        tab === FeatureTab.INDIVIDUAL
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setTab(FeatureTab.INDIVIDUAL);
                                    }}
                                >
                                    <span className="icon">
                                        <i className="far fa-user"></i>
                                    </span>
                                    <span>Cá nhân</span>
                                </div>
                                <div className="verticle-line"></div>
                                <div
                                    className={`section-features__tab ${
                                        tab === FeatureTab.ENTERPRISE
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setTab(FeatureTab.ENTERPRISE);
                                    }}
                                >
                                    <span className="icon">
                                        <i className="far fa-building"></i>
                                    </span>
                                    <span>Doanh nghiệp</span>
                                </div>
                            </div>
                            {tab === FeatureTab.INDIVIDUAL && (
                                <div className="section-features__list">
                                    <Link href={"/account"}>
                                        <div className="section-features__item">
                                            <span className="icon">
                                                <i className="fas fa-info-circle"></i>
                                            </span>
                                            <span>Cập nhật thông tin</span>
                                        </div>
                                    </Link>
                                    <Link href={"/wallet"}>
                                        <div className="section-features__item">
                                            <span className="icon">
                                                <i className="fas fa-wallet"></i>
                                            </span>
                                            <span>
                                                Ví
                                                <br /> của tôi
                                            </span>
                                        </div>
                                    </Link>
                                    <Link href={"/customers"}>
                                        <div className="section-features__item">
                                            <span className="icon">
                                                <i className="fas fa-sitemap"></i>
                                            </span>
                                            <span>
                                                Danh sách
                                                <br /> đại lý
                                            </span>
                                        </div>
                                    </Link>
                                    <Link href={"/cv"}>
                                        <div className="section-features__item">
                                            <span className="icon">
                                                <i className="far fa-file"></i>
                                            </span>
                                            <span>
                                                Quản lý
                                                <br /> CV
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="fas fa-shopping-bag"></i>
                                        </span>
                                        <span>
                                            Shop
                                            <br /> của tôi
                                        </span>
                                    </div>
                                    <Link href={"/pay-bill/electric"}>
                                        <div className="section-features__item">
                                            <span className="icon">
                                                <i className="fas fa-bolt"></i>
                                            </span>
                                            <span>
                                                Thanh toán
                                                <br /> tiền điện
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            )}
                            {tab === FeatureTab.ENTERPRISE && (
                                <div className="section-features__list">
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="far fa-address-card"></i>
                                        </span>
                                        <span>
                                            Quản lý
                                            <br /> nhân sự
                                        </span>
                                    </div>
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="fas fa-boxes"></i>
                                        </span>
                                        <span>
                                            Quản lý
                                            <br /> kho
                                        </span>
                                    </div>
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="fas fa-tasks"></i>
                                        </span>
                                        <span>
                                            Quản lý
                                            <br /> dự án
                                        </span>
                                    </div>
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="fas fa-store"></i>
                                        </span>
                                        <span>
                                            Quản lý
                                            <br /> bán hàng
                                        </span>
                                    </div>
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="fas fa-user-friends"></i>
                                        </span>
                                        <span>
                                            Quản lý
                                            <br />
                                            khách hàng
                                        </span>
                                    </div>
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="fas fa-file-invoice-dollar"></i>
                                        </span>
                                        <span>
                                            Quản lý
                                            <br />
                                            kế toán
                                        </span>
                                    </div>
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="fas fa-dollar-sign"></i>
                                        </span>
                                        <span>
                                            Quản lý
                                            <br />
                                            chi phí
                                        </span>
                                    </div>
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="fas fa-calendar-check"></i>
                                        </span>
                                        <span>
                                            Quản lý
                                            <br />
                                            cuộc hẹn
                                        </span>
                                    </div>
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="fas fa-receipt"></i>
                                        </span>
                                        <span>
                                            Quản lý
                                            <br />
                                            hóa đơn
                                        </span>
                                    </div>
                                    <div className="section-features__item inactive">
                                        <span className="icon">
                                            <i className="fas fa-calendar-alt"></i>
                                        </span>
                                        <span>
                                            Quản lý
                                            <br />
                                            thời gian biểu
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default Features;
