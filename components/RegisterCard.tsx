import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import SessionContext from "../context/session-context";
import { useLogoutHandler } from "../pkg";

interface Props {
    id: string | string[] | undefined;
}

function RegisterCard(props: Props) {
    const { session } = useContext(SessionContext);
    const router = useRouter();
    const { id } = props;

    const logout = useLogoutHandler();
    const [active, setActive] = useState<number>(1);
    const onRegister = async () => {
        if (session) {
            await logout();
        }
        router.push(`/register?card_id=${id}`);
    };

    return (
        <section className="section active">
            <div className="homecolor-box" />
            <div className="common_bg animate__animated animate__zoomIn">
                <div className="container m-auto">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="home-content text-center">
                                <div className="onboarding-container">
                                    <div
                                        className="steps"
                                        style={{
                                            transform: `translateX(${
                                                -(100 / 3) * (active - 1)
                                            }%)`,
                                        }}
                                    >
                                        <div className="step">
                                            <div className="image-container">
                                                <img
                                                    className="step-image"
                                                    src="/images/onboarding/tech.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="step-description">
                                                <p>
                                                    Ch??o m???ng ?????n v???i h??? sinh
                                                    th??i smartcard.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="image-container">
                                                <img
                                                    className="step-image"
                                                    src="/images/onboarding/image1.png"
                                                    alt=""
                                                />
                                            </div>

                                            <div className="step-description">
                                                <p>
                                                    Smart card l?? th??? th??ng minh
                                                    cho c?? nh??n v?? doanh nghi???p.
                                                    V???i smartcard, b???n c?? th???
                                                    ti???n l???i chia s??? th??ng tin
                                                    cho kh??ch h??ng c?? nh??n v??
                                                    t??ch h???p qu???n tr??? doanh
                                                    nghi???p
                                                </p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="image-container">
                                                <img
                                                    className="step-image"
                                                    src="/images/onboarding/social.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="step-description">
                                                <p>
                                                    ????ng k?? ngay v?? b???t ?????u tr???i nghi???m
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-container ">
                                        <div
                                            className={`skip-btn ${
                                                active === 3 ? "btn-hiden" : ""
                                            }`}
                                            onClick={() => {
                                                setActive(3);
                                            }}
                                        >
                                            B??? qua
                                        </div>
                                        <div className="dots">
                                            <div
                                                className={`dot ${
                                                    active === 1 ? "active" : ""
                                                }`}
                                            ></div>
                                            <div
                                                className={`dot ${
                                                    active === 2 ? "active" : ""
                                                }`}
                                            ></div>
                                            <div
                                                className={`dot ${
                                                    active === 3 ? "active" : ""
                                                }`}
                                            ></div>
                                        </div>
                                        <div
                                            className={`next-btn ${
                                                active === 3 ? "btn-hiden" : ""
                                            }`}
                                            onClick={() => {
                                                setActive((prep) => prep + 1);
                                            }}
                                        >
                                            Ti???p t???c
                                        </div>
                                    </div>
                                    <button
                                        className={`btn btn-link ${
                                            active === 3 ? "" : "btn-hiden"
                                        }`}
                                        onClick={onRegister}
                                    >
                                        ????ng k?? ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegisterCard;
