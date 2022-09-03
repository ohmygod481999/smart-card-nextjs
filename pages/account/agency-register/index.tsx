import { useLazyQuery, useQuery } from "@apollo/client";
import axios from "axios";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SectionLayout from "../../../components/SectionLayout";
import SessionContext from "../../../context/session-context";
import { RegistrationType } from "../../../types/global";
import { apolloClient } from "../../../utils/apollo";
import { INSERT_REGISTRATION } from "../../../utils/apollo/mutations/registration.mutation";
import { GET_AGENCY_REGISTRATION_BY_ACCOUNT_ID } from "../../../utils/apollo/queries/registration.queries";

function AgencyRegister() {
    const router = useRouter();

    const [getRegistrationByAccountId, { called, loading, data }] =
        useLazyQuery(GET_AGENCY_REGISTRATION_BY_ACCOUNT_ID, {
            fetchPolicy: "network-only",
        });

    const [agree, setAgree] = useState(false);

    const { session } = useContext(SessionContext);

    useEffect(() => {
        if (session) {
            console.log(session);
            getRegistrationByAccountId({
                variables: {
                    account_id: session.user.id,
                },
            });
        } else if (session === null) {
            router.push("/login");
        }
    }, [session]);

    const onNext = useCallback(async () => {
        if (agree && session) {
            try {
                // const res = await apolloClient.mutate({
                //     mutation: INSERT_REGISTRATION,
                //     variables: {
                //         account_id: session.user.id,
                //         type: RegistrationType.AGENCY,
                //     },
                // });
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/agency/register`,
                    {
                        account_id: session.user.id,
                    }
                );
                router.push("/account/agency-register/success");
            } catch (err) {
                alert(`Có lỗi xảy ra\n${_.get(err, "response.data.message")}`);
            }
        } else {
            alert("Vui lòng đồng ý với điều khoản");
        }
    }, [agree, session]);

    if (loading || !called) {
        return <SectionLayout>Loading</SectionLayout>;
    }

    if (called && !loading && data?.agency_register?.length > 0) {
        return (
            <SectionLayout>
                <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                    <p className="common-desctiption">Agency registration</p>
                    <h1 className="common-title">
                        Đăng ký <span>đại lý</span>
                    </h1>
                    <div className="animated-bar" />
                </div>
                <div
                    style={{
                        marginTop: 40,
                    }}
                >
                    <p className="text-center">
                        Đăng ký của bạn đang trong quá trình kiểm duyệt, hãy
                        chắc chắn bạn đã chuyển khoản cho chúng tôi. Quá trình
                        xử lý chậm nhất trong 24 giờ từ khi bạn chuyển khoản
                        thành công
                    </p>
                    <p className="text-center">
                        Trở lại <Link href={"/home"}>trang chủ</Link>
                    </p>
                </div>
            </SectionLayout>
        );
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
                            <div className="col-12">
                                <h3>Quy định</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Etiam id massa accumsan,
                                    aliquam felis non, vestibulum purus.
                                    Suspendisse congue lacinia pharetra.
                                    Maecenas id urna tortor. In vitae nisl sed
                                    risus ornare viverra. Nulla hendrerit nibh a
                                    sapien vehicula, ut laoreet nulla porttitor.
                                    Donec luctus, tellus eu viverra dapibus,
                                    quam dolor bibendum est, ac laoreet eros
                                    ante nec lacus. Suspendisse mi erat,
                                    eleifend eu orci eget, vestibulum
                                    sollicitudin nisi. Fusce a leo nec dolor
                                    pulvinar luctus vitae sed elit. Vestibulum
                                    sed dapibus sapien. Nullam auctor eros ac
                                    nisl viverra gravida.
                                </p>
                                <div
                                    className="form-check"
                                    style={{
                                        marginBottom: "30px",
                                    }}
                                >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={agree}
                                        onChange={(event) => {
                                            setAgree(event.target.checked);
                                        }}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexCheckDefault"
                                        onClick={() => {
                                            setAgree(!agree);
                                        }}
                                    >
                                        Tôi đồng ý với điều khoản
                                    </label>
                                </div>
                                <div className="form-submit">
                                    <button
                                        onClick={onNext}
                                        className="clickbtn"
                                    >
                                        Tiếp tục
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

export default AgencyRegister;
