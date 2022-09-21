import { useLazyQuery } from "@apollo/client";
import _ from "lodash";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import LayoutAuthed from "../../../components/LayoutAuthed";
import SectionLayout from "../../../components/SectionLayout";
import SessionContext from "../../../context/session-context";
import {
    RechargeRegister,
    RechargeRegisterStatus,
    Wallet,
} from "../../../types/global";
import {
    formatDateTime,
    formatMoney,
    getDataGraphqlResult,
} from "../../../utils";
import { apolloClient } from "../../../utils/apollo";
import { INSERT_RECHARGE_REGISTER } from "../../../utils/apollo/mutations/recharge-register.mutation";
import { GET_RECHARGE_UNAPPROVED_REGISTRATION_BY_ACCOUNT_ID } from "../../../utils/apollo/queries/recharge-register.queries";
import { GET_WALLET } from "../../../utils/apollo/queries/wallet.queries";

function Recharge() {
    const router = useRouter();
    const { session, updateSession } = useContext(SessionContext);

    const rechargeAmountRef = useRef(null);
    const [errMsg, setErrMsg] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);

    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [getWallet, { called, loading, data }] = useLazyQuery(GET_WALLET);

    const [unapprovedRecharges, setUnapprovedRecharges] = useState<
        null | RechargeRegister[]
    >(null);
    useEffect(() => {
        if (session) {
            getWallet({
                variables: {
                    account_id: session.user.id,
                },
                context: {
                    headers: {
                        "x-hasura-user-id": session.user.id,
                    },
                },
            });
            apolloClient
                .query({
                    query: GET_RECHARGE_UNAPPROVED_REGISTRATION_BY_ACCOUNT_ID,
                    variables: {
                        account_id: session.user.id,
                    },
                    fetchPolicy: "network-only",
                })
                .then(({ data }) => {
                    const withdrawRegistrations = getDataGraphqlResult(data);
                    setUnapprovedRecharges(withdrawRegistrations);
                });
        } else if (session === null) {
            router.push("/login");
        }
    }, [session]);

    useEffect(() => {
        if (data) {
            const _wallet = getDataGraphqlResult(data);
            setWallet(_wallet);
        }
    }, [data]);

    const onWithdrawSubmit = useCallback(async () => {
        if (wallet && session) {
            const withdrawalAmount = parseInt(
                _.get(rechargeAmountRef, "current.value")
            );
            if (isNaN(withdrawalAmount)) {
                setErrMsg("Số tiền nạp không hợp lệ");
                return;
            }
            if (withdrawalAmount < 10000) {
                setErrMsg("Số tiền nạp tối thiểu là 10,000đ");
                return;
            }
            // const unapprovedRegsRes = await apolloClient.query({
            //     query: GET_WITHDRAW_REGISTRATION_BY_ACCOUNT_ID,
            //     variables: {
            //         account_id: session.user.id,
            //         approved: false,
            //     },
            // });
            // const unapprovedRegs: any[] = unapprovedRegsRes.data.registration;
            // if (unapprovedRegs.length > 0) {
            //     setErrMsg(
            //         "Bạn đang có một lệnh rút đang xử lý, vui lòng đợi chúng tôi xử lý xong để tiếp tục rút tiền"
            //     );
            //     return;
            // }

            setSubmitLoading(true);
            try {
                if (session && router.isReady) {
                    // account_id: session.user.id,
                    const unapprovedRegsRes = await apolloClient.query({
                        query: GET_RECHARGE_UNAPPROVED_REGISTRATION_BY_ACCOUNT_ID,
                        variables: {
                            account_id: session.user.id,
                        },
                    });
                    const unapprovedRegisters =
                        _.get(unapprovedRegsRes, "data.recharge_register") ||
                        [];

                    if (unapprovedRegisters.length > 0) {
                        setErrMsg("Tài khoản đang có 1 yêu cầu rút tồn tại");
                    } else {
                        const insertReqRes = await apolloClient.mutate({
                            mutation: INSERT_RECHARGE_REGISTER,
                            variables: {
                                account_id: session.user.id,
                                amount: withdrawalAmount,
                                status: RechargeRegisterStatus.CREATED,
                            },
                        });

                        if (insertReqRes.data) {
                            const { id } =
                                insertReqRes.data.insert_recharge_register_one;
                            router.push(`/wallet/recharge/success?id=${id}`);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
                setSubmitLoading(false);
            }
        }
    }, [wallet, session, router.isReady]);

    if (unapprovedRecharges && unapprovedRecharges.length > 0) {
        return (
            <LayoutAuthed>
                <Head>
                    <title>Smartcardnp - Nạp tiền</title>
                </Head>
                <SectionLayout>
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                                <h1 className="left-title">Nạp tiền</h1>
                                <div className="animated-bar left" />
                            </div>
                        </div>
                        <p>
                            Lệnh nạp tiền của bạn đang được xử lý, hãy chắc chắn
                            bạn đã chuyển khoản cho chúng tôi, nếu đã chuyển,
                            vui lòng chờ hệ thống xử lý trước khi tiếp tục nạp
                            tiền
                        </p>
                        {/* <div className="" */}
                        <div className="list-group">
                            {unapprovedRecharges.map((rechargeRegister) => (
                                <div
                                    key={rechargeRegister.id}
                                    className="list-group-item list-group-item-action flex-column align-items-start"
                                >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">
                                            Nạp{" "}
                                            {formatMoney(
                                                rechargeRegister.amount || 0
                                            )}
                                        </h5>
                                        <small>
                                            {formatDateTime(
                                                rechargeRegister.created_at
                                            )}
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        Mã lệnh nạp tiền:{" "}
                                        <span className="referer-code">
                                            #{rechargeRegister.id}
                                        </span>
                                    </p>
                                    <small>Trạng thái: đang xử lý.</small>
                                </div>
                            ))}
                        </div>
                    </div>
                </SectionLayout>
            </LayoutAuthed>
        );
    }

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Rút tiền</title>
            </Head>
            <SectionLayout>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                            <h1 className="left-title">
                                <button className="back-btn">
                                    <Link href={"/wallet"}>
                                        <Image
                                            src="/icon/back.png"
                                            width={22}
                                            height={22}
                                        />
                                    </Link>
                                </button>{" "}
                                Nạp tiền
                            </h1>
                            <div className="animated-bar left" />
                        </div>
                        <div className="section-withdraw">
                            <div>
                                <div className="withdraw-balance">
                                    <img
                                        src="/images/smartcard-crop.png"
                                        alt="wallet brand"
                                    />
                                    <span>
                                        Số dư:{" "}
                                        {wallet?.balance &&
                                            formatMoney(wallet?.balance)}
                                    </span>
                                </div>
                                <div className="withdraw-quantity">
                                    <div className="form-group mb-3">
                                        <label>Số tiền nạp</label>
                                        <input
                                            ref={rechargeAmountRef}
                                            autoComplete="off"
                                            className="form-control"
                                            placeholder="Số tiền nạp tối thiểu: 10,000đ"
                                            type="number"
                                            // value={withdrawalAmount}
                                            onChange={(e) => {
                                                setErrMsg("");
                                            }}
                                        />
                                        {errMsg && (
                                            <div className="error-msg">
                                                {errMsg}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                className="full-width-btn"
                                disabled={submitLoading}
                                onClick={onWithdrawSubmit}
                            >
                                Tạo lệnh nạp tiền
                            </button>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default Recharge;
