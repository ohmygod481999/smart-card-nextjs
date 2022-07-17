import { useLazyQuery } from "@apollo/client";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
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
} from "../../../types/global";
import {
    formatDateTime,
    formatMoney,
    getDataGraphqlResult,
    getWallet,
    paddingId,
} from "../../../utils";
import { apolloClient } from "../../../utils/apollo";
import { INSERT_REGISTRATION } from "../../../utils/apollo/mutations/registration.mutation";
import { GET_WITHDRAW_REGISTRATION_BY_ACCOUNT_ID } from "../../../utils/apollo/queries/registration.queries";
import {
    GET_WALLETS,
    UPDATE_BANK_ACCOUNT,
} from "../../../utils/apollo/queries/wallet.queries";

function Withdraw() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const router = useRouter();
    const { session, updateSession } = useContext(SessionContext);
    const [unapprovedWithdraws, setUnapprovedWithdraws] = useState<
        null | Registration[]
    >(null);
    const [withdrawalAmount, setWithdrawalAmount] = useState(50000);
    const [errMsg, setErrMsg] = useState("");

    const [wallets, setWallets] = useState<Wallet[] | null>(null);
    const [getWallets, { called, loading, data }] = useLazyQuery(GET_WALLETS);

    useEffect(() => {
        if (session) {
            getWallets({
                variables: {
                    account_id: session.user.id,
                },
            });
            apolloClient
                .query({
                    query: GET_WITHDRAW_REGISTRATION_BY_ACCOUNT_ID,
                    variables: {
                        account_id: session.user.id,
                        approved: false,
                    },
                    fetchPolicy: "network-only"
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
            const wallets = getDataGraphqlResult(data);
            setWallets(wallets);
        }
    }, [data]);

    const mainWallet: Wallet | null = useMemo(
        () => getWallet(wallets || [], WalletType.Main),
        [wallets]
    );

    useEffect(() => {
        if (mainWallet) {
            console.log(withdrawalAmount, mainWallet.amount);
            if (withdrawalAmount > mainWallet.amount) {
                setErrMsg(
                    "Số tiền rút lớn hơn số dư trong ví, vui lòng thử lại"
                );
            }
            if (withdrawalAmount < 50000) {
                setErrMsg("Số tiền rút tối thiểu là 50,000đ");
            }
        }
    }, [withdrawalAmount, mainWallet]);

    console.log(unapprovedWithdraws);

    const onSubmitAddBank = async (values: any) => {
        const { bank_name, bank_number } = values;
        console.log(values);
        if (mainWallet) {
            try {
                const updateRes = await apolloClient.mutate({
                    mutation: UPDATE_BANK_ACCOUNT,
                    variables: {
                        wallet_id: mainWallet.id,
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
        try {
            if (session && router.isReady) {
                const res = await apolloClient.mutate({
                    mutation: INSERT_REGISTRATION,
                    variables: {
                        account_id: session.user.id,
                        type: RegistrationType.WITHDRAW,
                        payload: {
                            amount: withdrawalAmount,
                        },
                    },
                });
                // if success
                if (res.data?.insert_registration_one) {
                    const { id } = res.data.insert_registration_one;
                    router.push(`/wallet/withdraw/success?id=${id}`);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [withdrawalAmount, session, router.isReady]);

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
                                                withdraw.payload?.amount || 0
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
                                            #{paddingId(withdraw.id)}
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
                            <h1 className="left-title">Rút tiền</h1>
                            <div className="animated-bar left" />
                        </div>
                        {called &&
                            !loading &&
                            (!mainWallet?.bank_name ||
                                !mainWallet.bank_number) && (
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
                            mainWallet?.bank_name &&
                            mainWallet?.bank_number && (
                                <div className="section-withdraw">
                                    <div>
                                        <div className="withdraw-balance">
                                            <img
                                                src="/images/smartcard-crop.png"
                                                alt="wallet brand"
                                            />
                                            <span>
                                                Số dư:{" "}
                                                {formatMoney(mainWallet.amount)}
                                            </span>
                                        </div>
                                        <div className="withdraw-quantity">
                                            <div className="form-group mb-3">
                                                <label>Số tiền cần rút</label>
                                                <input
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="0đ"
                                                    type="number"
                                                    value={withdrawalAmount}
                                                    onChange={(e) => {
                                                        setErrMsg("");
                                                        setWithdrawalAmount(
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        );
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
                                            <div className="withdraw-receiving-method">
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
                                                            Ngân hàng: MB Bank
                                                        </div>
                                                        <div>
                                                            Số tài khoản:
                                                            0829400301
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="full-width-btn"
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
