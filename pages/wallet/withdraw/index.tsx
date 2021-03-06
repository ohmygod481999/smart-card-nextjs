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
import _ from "lodash";
import Link from "next/link";
import Image from "next/image";

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
    const [unapprovedWithdraws, setUnapprovedWithdraws] = useState<
        null | Registration[]
    >(null);
    // const [withdrawalAmount, setWithdrawalAmount] = useState(50000);
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
            const wallets = getDataGraphqlResult(data);
            setWallets(wallets);
        }
    }, [data]);

    const mainWallet: Wallet | null = useMemo(
        () => getWallet(wallets || [], WalletType.Main),
        [wallets]
    );

    console.log(mainWallet);

    // useEffect(() => {
    //     if (mainWallet) {
    //         console.log(withdrawalAmount, mainWallet.amount);
    //         if (withdrawalAmount > mainWallet.amount) {
    //             setErrMsg(
    //                 "S??? ti???n r??t l???n h??n s??? d?? trong v??, vui l??ng th??? l???i"
    //             );
    //         }
    //         if (withdrawalAmount < 50000) {
    //             setErrMsg("S??? ti???n r??t t???i thi???u l?? 50,000??");
    //         }
    //     }
    // }, [withdrawalAmount, mainWallet]);

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
        if (mainWallet) {
            const withdrawalAmount = parseInt(
                _.get(withdrawalAmountRef, "current.value")
            );
            if (isNaN(withdrawalAmount)) {
                setErrMsg("S??? ti???n r??t kh??ng h???p l???");
                return;
            }
            if (withdrawalAmount > mainWallet.amount) {
                setErrMsg(
                    "S??? ti???n r??t l???n h??n s??? d?? trong v??, vui l??ng th??? l???i"
                );
                return;
            }
            if (withdrawalAmount < 50000) {
                setErrMsg("S??? ti???n r??t t???i thi???u l?? 50,000??");
                return;
            }
            if (mainWallet.amount - withdrawalAmount < 50000) {
                setErrMsg("S??? ti???n c??n l???i trong v?? t???i thi???u l?? 50,000??");
                return;
            }

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
        }
    }, [mainWallet, session, router.isReady]);

    if (unapprovedWithdraws && unapprovedWithdraws.length > 0) {
        return (
            <LayoutAuthed>
                <Head>
                    <title>Smartcardnp - R??t ti???n</title>
                </Head>
                <SectionLayout>
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                                <h1 className="left-title">R??t ti???n</h1>
                                <div className="animated-bar left" />
                            </div>
                        </div>
                        <p>
                            L???nh r??t ti???n c???a b???n ??ang ???????c x??? l??, vui l??ng ch???
                            h??? th???ng x??? l?? tr?????c khi ti???p t???c r??t ti???n
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
                                            R??t{" "}
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
                                        M?? l???nh r??t ti???n:{" "}
                                        <span className="referer-code">
                                            #{paddingId(withdraw.id)}
                                        </span>
                                    </p>
                                    <small>Tr???ng th??i: ??ang x??? l??.</small>
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
                <title>Smartcardnp - R??t ti???n</title>
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
                                R??t ti???n
                            </h1>
                            <div className="animated-bar left" />
                        </div>
                        {called &&
                            !loading &&
                            (!mainWallet?.bank_name ||
                                !mainWallet.bank_number) && (
                                <div>
                                    <p className="text-center">
                                        T??i kho???n ch??a c?? th??ng tin th??? ng??n
                                        h??ng, th??m t???i ????y:
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
                                                <label>M?? th???</label>
                                                <input
                                                    {...register("bank_name")}
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="T??n ng??n h??ng"
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label>S??? t??i kho???n</label>
                                                <input
                                                    {...register("bank_number")}
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="S??? t??i kho???n"
                                                />
                                            </div>
                                            <div className="form-submit">
                                                <button className="clickbtn">
                                                    L??u
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
                                                S??? d??:{" "}
                                                {formatMoney(mainWallet.amount)}
                                            </span>
                                        </div>
                                        <div className="withdraw-quantity">
                                            <div className="form-group mb-3">
                                                <label>S??? ti???n c???n r??t</label>
                                                <input
                                                    ref={withdrawalAmountRef}
                                                    autoComplete="off"
                                                    className="form-control"
                                                    placeholder="S??? ti???n r??t t???i thi???u: 50,000??"
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
                                                    Ph????ng th???c nh???n ti???n
                                                </div>
                                            </div>
                                            <div className="withdraw-receiving-method activate">
                                                <div className="withdraw-receiving-method__logo">
                                                    <i className="fas fa-money-check-alt"></i>
                                                </div>
                                                <div className="withdraw-receiving-method__content">
                                                    <div className="title">
                                                        Tr??? qua t??i kho???n ng??n
                                                        h??ng
                                                    </div>
                                                    <div className="description">
                                                        <div>
                                                            Ng??n h??ng:{" "}
                                                            {mainWallet.bank_name.toUpperCase()}
                                                        </div>
                                                        <div>
                                                            S??? t??i kho???n:{" "}
                                                            {
                                                                mainWallet.bank_number
                                                            }
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
                                        T???o l???nh r??t ti???n
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
