import { useLazyQuery, useQuery } from "@apollo/client";
import axios from "axios";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SectionLayout from "../../../components/SectionLayout";
import SessionContext from "../../../context/session-context";
import { AgencyType, RegistrationType } from "../../../types/global";
import { apolloClient } from "../../../utils/apollo";
import { INSERT_REGISTRATION } from "../../../utils/apollo/mutations/registration.mutation";
import { GET_ERP_REGISTRATION_BY_ACCOUNT_ID } from "../../../utils/apollo/queries/erp-account.queries";
import { GET_AGENCY_REGISTRATION_BY_ACCOUNT_ID } from "../../../utils/apollo/queries/registration.queries";

function ErpRegister() {
    const router = useRouter();
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const watchType = watch("type", "new-company");

    const [getErpRegistrationByAccountId, { called, loading, data }] =
        useLazyQuery(GET_ERP_REGISTRATION_BY_ACCOUNT_ID, {
            fetchPolicy: "network-only",
        });

    const [agree, setAgree] = useState(false);

    const { session } = useContext(SessionContext);

    useEffect(() => {
        if (session) {
            console.log(session);
            getErpRegistrationByAccountId({
                variables: {
                    account_id: session.user.id,
                },
            });
        } else if (session === null) {
            router.push("/login");
        }
    }, [session]);

    const onNext = useCallback(
        async (values: any) => {
            const { type, company_name, company_id } = values;
            if (agree && session) {
                try {
                    if (type === "new-company") {
                        const res = await axios.post(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}/erp/register-new-company`,
                            {
                                account_id: session.user.id,
                                company_name,
                            }
                        );
                    } else if (type === "exist-company") {
                        const checkCompanyExistRes = await axios.post(
                            `${process.env.NEXT_PUBLIC_ERP_SERVER_URL}/company/check-exist`,
                            {
                                company_id,
                            }
                        );
                        const { exist } = checkCompanyExistRes.data;
                        if (exist) {
                            const res = await axios.post(
                                `${process.env.NEXT_PUBLIC_SERVER_URL}/erp/register-exist-company`,
                                {
                                    account_id: session.user.id,
                                    company_id,
                                }
                            );
                            router.push(`/account/erp-register/success`);
                        }
                        else {
                            alert("Id Công ty không hợp lệ")
                        }
                    }
                    
                } catch (err) {
                    alert(
                        `Có lỗi xảy ra\n${_.get(err, "response.data.message")}`
                    );
                }
            } else {
                alert("Vui lòng đồng ý với điều khoản");
            }
        },
        [agree, session]
    );

    if (loading || !called) {
        return <SectionLayout>Loading</SectionLayout>;
    }

    if (called && !loading && data?.erp_account?.length > 0) {
        return (
            <SectionLayout>
                <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                    <p className="common-desctiption">Erp registration</p>
                    <h1 className="common-title">
                        Đăng ký <span>khách hàng doanh nghiệp</span>
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
                                        Erp registration
                                    </p>
                                    <h1 className="common-title">
                                        Đăng ký{" "}
                                        <span>khách hàng doanh nghiệp</span>
                                    </h1>
                                    <div className="animated-bar" />
                                </div>
                            </div>
                            <div className="col-12">
                                {/* <h3>Quy định</h3> */}
                                <div className="form-group mb-3">
                                    <label>
                                        Bạn đã có công ty trong hệ thống chưa?
                                    </label>
                                    <select
                                        {...register("type")}
                                        className="form-control"
                                        placeholder="Tên..."
                                    >
                                        <option value={"new-company"}>
                                            Tạo công ty mới của bạn
                                        </option>
                                        <option value={"exist-company"}>
                                            Gia nhập công ty đã có
                                        </option>
                                    </select>
                                </div>
                                {watchType === "new-company" && (
                                    <div className="form-group mb-3">
                                        <input
                                            {...register("company_name")}
                                            className="form-control"
                                            placeholder="Tên công ty"
                                        />
                                    </div>
                                )}
                                {watchType === "exist-company" && (
                                    <div className="form-group mb-3">
                                        <input
                                            {...register("company_id")}
                                            type="number"
                                            className="form-control"
                                            placeholder="ID công ty"
                                        />
                                    </div>
                                )}
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
                                        onClick={handleSubmit(onNext)}
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

export default ErpRegister;
