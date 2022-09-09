import { useLazyQuery } from "@apollo/client";
import Head from "next/head";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutAuthed from "../../components/LayoutAuthed";
import SectionLayout from "../../components/SectionLayout";
import SessionContext from "../../context/session-context";
import { BillInfoType } from "../../types/global";
import { getDataGraphqlResult } from "../../utils";
import { apolloClient } from "../../utils/apollo";
import {
    INSERT_BILL_INFO,
    UPDATE_BILL_INFO,
} from "../../utils/apollo/mutations/bill-info.mutation";
import { GET_BILL_INFO } from "../../utils/apollo/queries/bill-info.queries";

interface BillInfo {
    id: number;
    provider: string;
    billcode: string;
    phone: string;
}

function Electric() {
    const { session } = useContext(SessionContext);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [billInfo, setBillInfo] = useState<BillInfo | null | undefined>();

    useEffect(() => {
        if (session) {
            apolloClient
                .query({
                    query: GET_BILL_INFO,
                    variables: {
                        account_id: session.user.id,
                        type: BillInfoType.ELECTRIC,
                    },
                })
                .then((data) => {
                    const billResults = getDataGraphqlResult(data.data);
                    if (billResults && billResults.length > 0) {
                        setBillInfo({
                            ...billResults[0].payload,
                            id: billResults[0].id,
                        });
                    } else {
                        setBillInfo(null);
                    }
                });
        }
    }, [session]);

    useEffect(() => {
        if (billInfo) {
            setValue("billcode", billInfo.billcode);
            setValue("phone", billInfo.phone);
            setValue("provider", billInfo.provider);
        }
    }, [billInfo]);

    const onSubmit = useCallback(
        (data: any) => {
            const { provider, billcode, phone } = data;
            if (!session || billInfo === undefined) return;
            if (billInfo === null) {
                setLoading(true);
                apolloClient
                    .mutate({
                        mutation: INSERT_BILL_INFO,
                        variables: {
                            account_id: session.user.id,
                            type: BillInfoType.ELECTRIC,
                            payload: {
                                ...data,
                            },
                        },
                    })
                    .then((data) => {
                        if (data.data) {
                            setMsg("Thành công");
                        }
                    })
                    .catch((err) => {
                        setMsg(err);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(true);
                apolloClient
                    .mutate({
                        mutation: UPDATE_BILL_INFO,
                        variables: {
                            id: billInfo.id,
                            payload: {
                                ...data,
                            },
                        },
                    })
                    .then((data) => {
                        if (data.data) {
                            setMsg("Thành công");
                        }
                    })
                    .catch((err) => {
                        setMsg(err);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        },
        [session, billInfo]
    );

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Thanh toán tiền điện</title>
            </Head>
            <SectionLayout>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                            <h1 className="left-title">
                                Thanh toán <span>tiền điện</span>
                            </h1>
                            <div className="animated-bar left" />
                        </div>
                        <div className="section-features animate__animated animate__fadeInDown animate__delay-1s mt-3">
                            <div className=" form-group">
                                <label>Nhà cung cấp</label>
                                {/* <input className="form-control" /> */}
                                <select
                                    {...register("provider", {
                                        required: "Trường bắt buộc",
                                    })}
                                    className="form-control"
                                    name="provider"
                                >
                                    <option value="EVN_HN">
                                        Điện lực Hà Nội
                                    </option>
                                    <option value="EVN_HCM">
                                        Điện lực Hồ Chí Minh
                                    </option>
                                    <option value="EVN_NPC">
                                        Điện lực miền Bắc
                                    </option>
                                    <option value="EVN_CPC">
                                        Điện lực miền Trung
                                    </option>
                                    <option value="EVN_SPC">
                                        Điện lực miền Nam
                                    </option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Mã khách hàng</label>
                                <input
                                    {...register("billcode", {
                                        required: "Trường bắt buộc",
                                    })}
                                    className="form-control"
                                    name="billcode"
                                    placeholder="Nhập mã khách hàng"
                                />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại người thanh toán</label>
                                <input
                                    {...register("phone", {
                                        required: "Trường bắt buộc",
                                    })}
                                    className="form-control"
                                    name="phone"
                                    placeholder="Nhập số điện thoại người thanh toán"
                                />
                            </div>

                            {msg && <div>{msg}</div>}

                            <div className="form-submit">
                                <button
                                    className="clickbtn"
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={loading}
                                >
                                    {billInfo ? "Cập nhật" : "Lưu"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default Electric;
