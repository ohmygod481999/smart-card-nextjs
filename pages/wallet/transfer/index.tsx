import { useLazyQuery } from "@apollo/client";
import axios from "axios";
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
    Account,
    RechargeRegister,
    RechargeRegisterStatus,
    Wallet,
} from "../../../types/global";
import { formatMoney, getDataGraphqlResult } from "../../../utils";
import { apolloClient } from "../../../utils/apollo";
import { INSERT_RECHARGE_REGISTER } from "../../../utils/apollo/mutations/recharge-register.mutation";
import { GET_ACCOUNT } from "../../../utils/apollo/queries/account.queries";
import { GET_RECHARGE_UNAPPROVED_REGISTRATION_BY_ACCOUNT_ID } from "../../../utils/apollo/queries/recharge-register.queries";
import { GET_WALLET } from "../../../utils/apollo/queries/wallet.queries";

function TransferMoney() {
    const router = useRouter();
    const { session, updateSession } = useContext(SessionContext);

    const rechargeAmountRef = useRef(null);
    const noteRef = useRef(null);
    const userIdAmountRef = useRef(null);
    const [errMsg, setErrMsg] = useState("");
    const [userIdErrMsg, setUserIdErrMsg] = useState("");
    const [receiver, setReceiver] = useState<Account | null>(null);
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
            const transferAmount = parseInt(
                _.get(rechargeAmountRef, "current.value")
            );
            if (isNaN(transferAmount)) {
                setErrMsg("Số tiền nạp không hợp lệ");
                return;
            }
            if (transferAmount > wallet.balance) {
                setErrMsg(
                    "Số tiền rút lớn hơn số dư trong ví, vui lòng thử lại"
                );
                return;
            }
            if (transferAmount < 10000) {
                setErrMsg("Số tiền chuyển tối thiểu là 10,000đ");
                return;
            }
            if (wallet.balance - transferAmount < 50000) {
                setErrMsg("Số tiền còn lại trong ví tối thiểu là 50,000đ");
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
            try {
                setSubmitLoading(true);
                if (session && router.isReady && receiver) {
                    // source_id: session.user.id,
                    // target_id: receiver.id,
                    // note: _.get(noteRef, "current.value")
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/wallet/transfer`,
                        {
                            source_id: session.user.id,
                            target_id: receiver.id,
                            amount: transferAmount,
                            note: _.get(noteRef, "current.value")
                        }
                    );

                    if (res.data) {
                        const { success, message, data } = res.data;
                        if (success) {
                            const { id } = data;
                            // id: id transaction
                            router.push(`/wallet/transfer/success?id=${id}`);
                        } else {
                            setErrMsg(message);
                            setSubmitLoading(false);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
                setSubmitLoading(false);
            }
        }
    }, [wallet, session, router.isReady, receiver]);

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
                                Chuyển tiền
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
                                        <label>ID người nhận</label>
                                        <input
                                            ref={userIdAmountRef}
                                            autoComplete="off"
                                            className="form-control"
                                            placeholder=""
                                            type="number"
                                            onBlur={async (e) => {
                                                const userId = _.get(
                                                    userIdAmountRef,
                                                    "current.value"
                                                );
                                                if (!userId) {
                                                    return setUserIdErrMsg(
                                                        "Vui lòng nhập ID người nhận"
                                                    );
                                                }
                                                try {
                                                    const { data } =
                                                        await apolloClient.query(
                                                            {
                                                                query: GET_ACCOUNT,
                                                                variables: {
                                                                    id: parseInt(
                                                                        userId
                                                                    ),
                                                                },
                                                            }
                                                        );

                                                    const account: Account | null =
                                                        data.account_by_pk;

                                                    setReceiver(account);
                                                    if (account === null) {
                                                        setUserIdErrMsg(
                                                            "ID không hợp lệ"
                                                        );
                                                    }
                                                } catch (err) {
                                                    setUserIdErrMsg(
                                                        String(err)
                                                    );
                                                }
                                            }}
                                            // value={withdrawalAmount}
                                            onChange={(e) => {
                                                setUserIdErrMsg("");
                                            }}
                                        />
                                        {userIdErrMsg && (
                                            <div className="error-msg">
                                                {userIdErrMsg}
                                            </div>
                                        )}
                                    </div>
                                    {receiver && (
                                        <>
                                            <div className="form-group mb-3">
                                                <label>Người nhận</label>
                                                <input
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder=""
                                                    disabled
                                                    value={receiver.email}
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label>Số tiền chuyển</label>
                                                <input
                                                    ref={rechargeAmountRef}
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="Số tiền chuyển tối thiểu: 10,000đ"
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
                                            <div className="form-group mb-3">
                                                <label>Lời nhắn</label>
                                                <input
                                                    ref={noteRef}
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="Lời nhắn"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <button
                                className="full-width-btn"
                                disabled={submitLoading || receiver === null}
                                onClick={onWithdrawSubmit}
                            >
                                Chuyển tiền
                            </button>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default TransferMoney;
