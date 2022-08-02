import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect } from "react";
import SessionContext from "../../../context/session-context";
import { BANK_ACCOUNT } from "../../../utils";

function AgencyRegisterSuccess() {
    const router = useRouter();
    const { session } = useContext(SessionContext);

    // console.log(router.query);

    useEffect(() => {
        if (session === null) {
            router.push("/login");
        }
    }, [session]);


    const onComplete = useCallback(() => {
        router.push("/")
    }, []);

    if (!session) {
        return <div>Loading</div>;
    }

    return (
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
                                        Agency registration
                                    </p>
                                    <h1 className="common-title">
                                        Đăng ký <span>đại lý</span>
                                    </h1>
                                    <div className="animated-bar" />
                                </div>
                            </div>
                            <div
                                className="col-12"
                                style={{
                                    marginTop: 50,
                                }}
                            >
                                <h4 className="text-center">
                                    Đăng ký thành công
                                </h4>
                                <p className="text-center">
                                    Xin mời quý khách hàng chuyển khoản với lệ
                                    phí 2,000,000đ để chúng tôi kích hoạt tài
                                    khoản đại lý cho quý khách
                                </p>
                                <table className="table">
                                    <caption className="text-center">
                                        Thông tin chuyển khoản
                                    </caption>
                                    <thead>
                                        <tr>
                                            <td>Ngân hàng</td>
                                            <td>Chi nhánh</td>
                                            <td>Số tài khoản</td>
                                            <td>Nội dung chuyển khoản</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">{BANK_ACCOUNT.BANK_NAME}</th>
                                            <td>{BANK_ACCOUNT.BANK_BRANCH}</td>
                                            <td>{BANK_ACCOUNT.BANK_NUMBER}</td>
                                            <td>DKDL {session.user.id}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="form-submit">
                                    <button
                                        onClick={onComplete}
                                        className="clickbtn"
                                    >
                                        Xác nhận đã chuyển khoản
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

export default AgencyRegisterSuccess;
