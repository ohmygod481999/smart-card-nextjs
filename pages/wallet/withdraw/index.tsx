import { useLazyQuery } from "@apollo/client";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useForm } from "react-hook-form";
import LayoutAuthed from "../../../components/LayoutAuthed";
import SectionLayout from "../../../components/SectionLayout";
import SessionContext from "../../../context/session-context";
import {
    Registration,
    RegistrationType,
    Wallet,
    WalletType,
    Withdrawal,
    WithdrawalStatus,
} from "../../../types/global";
import {
    formatDateTime,
    formatMoney,
    getDataGraphqlResult,
} from "../../../utils";
import { apolloClient } from "../../../utils/apollo";
import { INSERT_REGISTRATION } from "../../../utils/apollo/mutations/registration.mutation";
import { GET_WITHDRAW_REGISTRATION_BY_ACCOUNT_ID } from "../../../utils/apollo/queries/registration.queries";
import {
    GET_WALLET,
    UPDATE_BANK_ACCOUNT,
} from "../../../utils/apollo/queries/wallet.queries";
import _ from "lodash";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

function Withdraw() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const withdrawalAmountRef = useRef(null);

    const router = useRouter();
    const { session, updateSession } = useContext(SessionContext);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [unapprovedWithdraws, setUnapprovedWithdraws] = useState<
        null | Withdrawal[]
    >(null);
    // const [withdrawalAmount, setWithdrawalAmount] = useState(50000);
    const [errMsg, setErrMsg] = useState("");

    const [wallet, setWallet] = useState<Wallet| null>(null);
    const [getWallet, { called, loading, data }] = useLazyQuery(GET_WALLET);

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
                    query: GET_WITHDRAW_REGISTRATION_BY_ACCOUNT_ID,
                    variables: {
                        account_id: session.user.id,
                        status: WithdrawalStatus.PENDING,
                    },
                    fetchPolicy: "network-only",
                })
                .then(({ data }) => {
                    const withdrawRegistrations = getDataGraphqlResult(data);
                    setUnapprovedWithdraws(withdrawRegistrations);
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

    const onSubmitAddBank = async (values: any) => {
        const { bank_name, bank_number } = values;
        console.log(values);
        if (session) {
            try {
                const updateRes = await apolloClient.mutate({
                    mutation: UPDATE_BANK_ACCOUNT,
                    variables: {
                        account_info_id: session?.user.account_info.id,
                        bank_name,
                        bank_number,
                    },
                });
                Router.reload();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const onWithdrawSubmit = useCallback(async () => {
        if (wallet && session) {
            const withdrawalAmount = parseInt(
                _.get(withdrawalAmountRef, "current.value")
            );
            if (isNaN(withdrawalAmount)) {
                setErrMsg("Số tiền rút không hợp lệ");
                return;
            }
            if (withdrawalAmount > wallet.balance) {
                setErrMsg(
                    "Số tiền rút lớn hơn số dư trong ví, vui lòng thử lại"
                );
                return;
            }
            if (withdrawalAmount < 50000) {
                setErrMsg("Số tiền rút tối thiểu là 50,000đ");
                return;
            }
            if (wallet.balance - withdrawalAmount < 50000) {
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

            setSubmitLoading(true);
            try {
                if (session && router.isReady) {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/withdrawal/register-withdraw`,
                        {
                            account_id: session.user.id,
                            amount: withdrawalAmount,
                        }
                    );
                    if (res.data) {
                        const { success, message, data } = res.data;
                        if (success) {
                            const { id } = data;
                            router.push(`/wallet/withdraw/success?id=${id}`);
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
    }, [wallet, session, router.isReady]);

    if (unapprovedWithdraws && unapprovedWithdraws.length > 0) {
        return (
            <LayoutAuthed>
                <Head>
                    <title>Smartcardnp - Rút tiền</title>
                </Head>
                <SectionLayout>
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                                <h1 className="left-title">Rút tiền</h1>
                                <div className="animated-bar left" />
                            </div>
                        </div>
                        <p>
                            Lệnh rút tiền của bạn đang được xử lý, vui lòng chờ
                            hệ thống xử lý trước khi tiếp tục rút tiền
                        </p>
                        {/* <div className="" */}
                        <div className="list-group">
                            {unapprovedWithdraws.map((withdraw) => (
                                <div
                                    key={withdraw.id}
                                    className="list-group-item list-group-item-action flex-column align-items-start"
                                >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">
                                            Rút{" "}
                                            {formatMoney(
                                                withdraw.amount || 0
                                            )}
                                        </h5>
                                        <small>
                                            {formatDateTime(
                                                withdraw.created_at
                                            )}
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        Mã lệnh rút tiền:{" "}
                                        <span className="referer-code">
                                            {withdraw.id}
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
                                Rút tiền
                            </h1>
                            <div className="animated-bar left" />
                        </div>
                        {called &&
                            !loading &&
                            (!session?.user.account_info.bank_name ||
                                !session?.user.account_info.bank_number) && (
                                <div>
                                    <p className="text-center">
                                        Tài khoản chưa có thông tin thẻ ngân
                                        hàng, thêm tại đây:
                                    </p>
                                    <div className="row justify-content-center">
                                        <form
                                            className="register-form row"
                                            onSubmit={handleSubmit(
                                                onSubmitAddBank
                                            )}
                                            autoComplete="off"
                                        >
                                            <div className="form-group mb-3">
                                                <label>Mã thẻ</label>
                                                <input
                                                    {...register("bank_name")}
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="Tên ngân hàng"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label>Số tài khoản</label>
                                                <input
                                                    {...register("bank_number")}
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="Số tài khoản"
                                                />
                                            </div>
                                            <div className="form-submit">
                                                <button className="clickbtn">
                                                    Lưu
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                        {called &&
                            !loading &&
                            session?.user.account_info.bank_name &&
                            session?.user.account_info.bank_number && (
                                <div className="section-withdraw">
                                    <div>
                                        <div className="withdraw-balance">
                                            <img
                                                src="/images/smartcard-crop.png"
                                                alt="wallet brand"
                                            />
                                            <span>
                                                Số dư:{" "}
                                                {wallet?.balance && formatMoney(wallet?.balance)}
                                            </span>
                                        </div>
                                        <div className="withdraw-quantity">
                                            <div className="form-group mb-3">
                                                <label>Số tiền cần rút</label>
                                                <input
                                                    ref={withdrawalAmountRef}
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="Số tiền rút tối thiểu: 50,000đ"
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
                                        <div className="withdraw-receiving-methods">
                                            <div className="title-section">
                                                <div className="title-section__title">
                                                    Phương thức nhận tiền
                                                </div>
                                            </div>
                                            <div className="withdraw-receiving-method activate">
                                                <Link
                                                    href={
                                                        "/wallet/withdraw/edit-bank-info"
                                                    }
                                                >
                                                    <div className="withdraw-receiving-method__edit">
                                                        Sửa
                                                    </div>
                                                </Link>
                                                <div className="withdraw-receiving-method__logo">
                                                    <i className="fas fa-money-check-alt"></i>
                                                </div>
                                                <div className="withdraw-receiving-method__content">
                                                    <div className="title">
                                                        Trả qua tài khoản ngân
                                                        hàng
                                                    </div>
                                                    <div className="description">
                                                        <div>
                                                            Ngân hàng:{" "}
                                                            {session.user.account_info.bank_name}
                                                            {/* {wallet?.balance.toUpperCase()} */}
                                                        </div>
                                                        <div>
                                                            Số tài khoản:{" "}
                                                            {session.user.account_info.bank_number}
                                                            {/* {
                                                                wallet.bank_number
                                                            } */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="full-width-btn"
                                        disabled={submitLoading}
                                        onClick={onWithdrawSubmit}
                                    >
                                        Tạo lệnh rút tiền
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default Withdraw;
