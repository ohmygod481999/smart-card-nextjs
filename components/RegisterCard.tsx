import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
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

    const onRegister = () => {
        if (session) {
            logout()?.then(() => {
                router.push(`/user/${id}/registration`);
            });
        }
    };

    return (
        <section className="section active">
            <div className="homecolor-box" />
            <div className="common_bg animate__animated animate__zoomIn">
                <div className="container m-auto">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="home-content text-center">
                                <p className="common-desctiption animate__animated animate__fadeInDown animate__delay-1s">
                                    Thẻ chưa kích hoạt
                                </p>
                                <p>
                                    <button
                                        className="btn btn-link"
                                        onClick={onRegister}
                                    >
                                        Đăng ký
                                    </button>
                                    ngay
                                    {/* <Link href={`/user/${id}/registration`}>Đăng ký</Link>  */}
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

export default RegisterCard;
