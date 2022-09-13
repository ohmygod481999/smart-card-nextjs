import { useLazyQuery, useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import LayoutAuthed from "../../components/LayoutAuthed";
import SessionContext from "../../context/session-context";
import {
    SecondaryTransaction,
    SecondaryTransactionType,
    Transaction,
    TransactionTypeEnum,
    Wallet,
    WalletType,
} from "../../types/global";
import {
    formatDateTime,
    formatMoney,
    getDataGraphqlResult,
    getTransactionName,
    transactionMapping,
} from "../../utils";
import { apolloClient } from "../../utils/apollo";
import {
    GET_SECONDARY_TRANSATIONS,
    GET_TRANSATIONS,
} from "../../utils/apollo/queries/transaction.queries";
import { GET_WALLET } from "../../utils/apollo/queries/wallet.queries";

function WalletPage() {
    const router = useRouter();

    const { session, updateSession } = useContext(SessionContext);

    const [wallet, setWallet] = useState<Wallet | null>(null);
    // const [mainWalletTransactions, setMainWalletTransactions] = useState<
    //     Transaction[] | null
    // >(null);
    const [secondaryWalletTransactions, setSecondaryWalletTransactions] =
        useState<Transaction[] | null>(null);

    const [walletTab, setWalletTab] = useState<WalletType>(WalletType.Main);

    const [getWallet, { called, loading, data }] = useLazyQuery(GET_WALLET, {
        fetchPolicy: "network-only",
    });

    const [getTransactions, queryTransactionValues] =
        useLazyQuery(GET_TRANSATIONS);

    const [getSecondaryTransactions, querySecondaryTransactionValues] =
        useLazyQuery(GET_SECONDARY_TRANSATIONS);

    useEffect(() => {
        if (session) {
            console.log(session);
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
            getTransactions({
                variables: {
                    account_id: session.user.id,
                },
            });
            getSecondaryTransactions({
                variables: {
                    account_id: session.user.id,
                },
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

    const mainWalletTransactions = useMemo(() => {
        if (!session) {
            return [];
        }
        if (!queryTransactionValues.data) {
            return [];
        }
        return getDataGraphqlResult(queryTransactionValues.data).filter(
            (transaction: Transaction) => {
                if (
                    transaction.source_id === transaction.target_id &&
                    transaction.source_id === session.user.id
                ) {
                    return false;
                }

                return true;
            }
        );
    }, [queryTransactionValues.data, session]);

    const secondaryTransactions: SecondaryTransaction[] = useMemo(() => {
        if (!session) {
            return [];
        }
        if (!querySecondaryTransactionValues.data) {
            return [];
        }
        return getDataGraphqlResult(querySecondaryTransactionValues.data);
    }, [querySecondaryTransactionValues.data, session]);

    console.log(secondaryTransactions);

    console.log(mainWalletTransactions);

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Ví của tôi</title>
            </Head>
            <section id="contact" className="section active">
                <div className="homecolor-box" />
                <div className="common_bg animate__animated animate__zoomIn">
                    <div className="container">
                        {/* Contact-page Start */}
                        <div className="contact-section">
                            {/* Contact-Section Title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                                        <h1 className="left-title">
                                            Ví <span>của tôi</span>
                                        </h1>
                                        <div className="animated-bar left" />
                                    </div>
                                </div>
                            </div>
                            <div className="wallet-tab-list">
                                <div
                                    className={`wallet-tab ${
                                        walletTab === WalletType.Main
                                            ? "activate"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setWalletTab(WalletType.Main)
                                    }
                                >
                                    Ví chính
                                </div>
                                <div
                                    className={`wallet-tab ${
                                        walletTab === WalletType.Secondary
                                            ? "activate"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setWalletTab(WalletType.Secondary)
                                    }
                                >
                                    Ví phụ
                                </div>
                            </div>
                            {walletTab === WalletType.Main && (
                                <div className="wallet-amount">
                                    <div className="wallet-amount__title">
                                        Số tiền hiện có
                                    </div>
                                    <div className="wallet-amount__money">
                                        {wallet && formatMoney(wallet.balance)}
                                    </div>
                                </div>
                            )}
                            {walletTab === WalletType.Secondary && (
                                <div className="wallet-amount">
                                    <div className="wallet-amount__title">
                                        Số tiền hiện có
                                    </div>
                                    <div className="wallet-amount__money">
                                        {wallet &&
                                            formatMoney(
                                                wallet.secondary_balance
                                            )}
                                        {/* {secondaryWallet &&
                                            formatMoney(secondaryWallet.amount)} */}
                                    </div>
                                </div>
                            )}
                            {walletTab === WalletType.Main && (
                                <>
                                    <div className="title-section">
                                        <div className="title-section__title">
                                            Dịch vụ
                                        </div>
                                    </div>
                                    <div className="section-features__list">
                                        <div className="section-features__item inactive">
                                            <span className="icon">
                                                <i className="fas fa-sign-in-alt"></i>
                                            </span>
                                            <span>Nạp tiền</span>
                                        </div>
                                        <Link href="/wallet/withdraw">
                                            <div className="section-features__item">
                                                <span className="icon">
                                                    <i className="fas fa-sign-out-alt"></i>
                                                </span>
                                                <span>Rút tiền</span>
                                            </div>
                                        </Link>
                                        <div className="section-features__item">
                                            <span className="icon">
                                                <i className="fas fa-history"></i>
                                            </span>
                                            <span>
                                                lịch sử
                                                <br /> giao dịch
                                            </span>
                                        </div>
                                        <div className="section-features__item inactive">
                                            <span className="icon">
                                                <i className="fas fa-headset"></i>
                                            </span>
                                            <span>Hỗ trợ</span>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="title-section">
                                <div className="title-section__title">
                                    Lịch sử giao dịch
                                </div>
                            </div>
                            {(function () {
                                let transactions: Transaction[] | null = null;
                                if (walletTab === WalletType.Main) {
                                    transactions = mainWalletTransactions;
                                    return (
                                        <div className="wallet-transaction">
                                            {transactions ? (
                                                transactions.length > 0 ? (
                                                    transactions.map(
                                                        (transaction) => {
                                                            let sign = "+";
                                                            if (
                                                                session?.user
                                                                    .id ===
                                                                transaction.source_id
                                                            ) {
                                                                sign = "-";
                                                            }
                                                            return (
                                                                <div
                                                                    key={
                                                                        transaction.id
                                                                    }
                                                                    className="wallet-transaction__item"
                                                                >
                                                                    <div className="wallet-transaction__item__left">
                                                                        <div className="wallet-transaction__item__left__title">
                                                                            <Link
                                                                                href={
                                                                                    "/wallet/transaction/" +
                                                                                    transaction.id
                                                                                }
                                                                            >
                                                                                {getTransactionName(
                                                                                    transaction,
                                                                                    session
                                                                                        ?.user
                                                                                        .id
                                                                                )}
                                                                                {/* {transaction.type in
                                                                            transactionMapping
                                                                                ? transactionMapping[
                                                                                      transaction
                                                                                          .type
                                                                                  ]
                                                                                : transaction.type} */}
                                                                            </Link>
                                                                        </div>
                                                                        {transaction.note && (
                                                                            <div className="wallet-transaction__item__left__description">
                                                                                Nội dung: <strong>{
                                                                                    transaction.note
                                                                                }</strong>
                                                                            </div>
                                                                        )}
                                                                        <div className="wallet-transaction__item__left__description">
                                                                            {formatDateTime(
                                                                                transaction.created_at
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="wallet-transaction__item__right">
                                                                        <div>
                                                                            {`${
                                                                                // transaction.type !==
                                                                                //     TransactionTypeEnum.WITHDRAW &&
                                                                                // transaction.type !==
                                                                                //     TransactionTypeEnum.PAYMENT
                                                                                //     ? "+ "
                                                                                //     : "- "
                                                                                sign
                                                                            }${formatMoney(
                                                                                transaction.amount
                                                                            )}`}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <div className="wallet-transaction__item justify-content-center">
                                                        <div>Trống</div>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="wallet-transaction__item justify-content-center">
                                                    <div>Loading...</div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                if (walletTab === WalletType.Secondary) {
                                    return (
                                        <div className="wallet-transaction">
                                            {secondaryTransactions.map(
                                                (transaction) => (
                                                    <div
                                                        key={transaction.id}
                                                        className="wallet-transaction__item"
                                                    >
                                                        <div className="wallet-transaction__item__left">
                                                            <div className="wallet-transaction__item__left__title">
                                                                {
                                                                    {
                                                                        [SecondaryTransactionType.DEFAULT]:
                                                                            "Thưởng CTV mới",
                                                                        [SecondaryTransactionType.REWARD_NEW_AGENCY]:
                                                                            "Thưởng đại lý mới",
                                                                    }[
                                                                        transaction
                                                                            .type
                                                                    ]
                                                                }
                                                            </div>
                                                            <div className="wallet-transaction__item__left__description">
                                                                {formatDateTime(
                                                                    transaction.created_at
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="wallet-transaction__item__right">
                                                            <div>
                                                                {transaction.amount >
                                                                0
                                                                    ? "+"
                                                                    : "-"}{" "}
                                                                {formatMoney(
                                                                    transaction.amount
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                        {/* Contact-page End */}
                    </div>
                </div>
            </section>
        </LayoutAuthed>
    );
}

export default WalletPage;
