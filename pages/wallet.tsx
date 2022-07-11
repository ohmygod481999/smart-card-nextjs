import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import LayoutAuthed from "../components/LayoutAuthed";
import SessionContext from "../context/session-context";
import { Transaction, Wallet, WalletType } from "../types/global";
import {
    formatDateTime,
    formatMoney,
    getDataGraphqlResult,
    transactionMapping,
} from "../utils";
import { apolloClient } from "../utils/apollo";
import { GET_TRANSATION } from "../utils/apollo/queries/transaction.queries";
import { GET_WALLETS } from "../utils/apollo/queries/wallet.queries";

const getWallet = (
    wallets: Wallet[],
    walletType: WalletType
): Wallet | null => {
    let result = null;
    wallets.forEach((wallet) => {
        if (wallet.type === walletType) {
            result = wallet;
        }
    });
    return result;
};

function WalletPage() {
    const router = useRouter();

    const { session, updateSession } = useContext(SessionContext);
    const [wallets, setWallets] = useState<Wallet[] | null>(null);
    const [transactions, setTransactions] = useState<Transaction[] | null>(
        null
    );

    const [walletTab, setWalletTab] = useState<WalletType>(WalletType.Main);

    const [getWallets, { called, loading, data }] = useLazyQuery(GET_WALLETS);

    useEffect(() => {
        if (session) {
            console.log(session);
            getWallets({
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
            const wallets = getDataGraphqlResult(data);
            setWallets(wallets);
        }
    }, [data]);

    useEffect(() => {
        if (session) {
            apolloClient
                .query({
                    query: GET_TRANSATION,
                    variables: {
                        account_id: session.user.id,
                    },
                })
                .then(({ data }) => {
                    const _transaction = getDataGraphqlResult(data);
                    setTransactions(_transaction);
                });
        }
    }, [data]);

    const mainWallet: Wallet | null = useMemo(
        () => getWallet(wallets || [], WalletType.Main),
        [wallets]
    );

    const secondaryWallet: Wallet | null = useMemo(
        () => getWallet(wallets || [], WalletType.Secondary),
        [wallets]
    );

    return (
        <LayoutAuthed>
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
                                        {mainWallet &&
                                            formatMoney(mainWallet.amount)}
                                    </div>
                                </div>
                            )}
                            {walletTab === WalletType.Secondary && (
                                <div className="wallet-amount">
                                    <div className="wallet-amount__title">
                                        Số tiền hiện có
                                    </div>
                                    <div className="wallet-amount__money">
                                        {secondaryWallet &&
                                            formatMoney(secondaryWallet.amount)}
                                    </div>
                                </div>
                            )}
                            <div className="title-section">
                                <div className="title-section__title">
                                    Lịch sử giao dịch
                                </div>
                            </div>

                            {walletTab === WalletType.Main && (
                                <div className="wallet-transaction">
                                    {transactions ? (
                                        transactions.length > 0 ? (
                                            transactions.map((transaction) => (
                                                <div
                                                    key={transaction.id}
                                                    className="wallet-transaction__item"
                                                >
                                                    <div className="wallet-transaction__item__left">
                                                        <div className="wallet-transaction__item__left__title">
                                                            {
                                                                transactionMapping[
                                                                    transaction
                                                                        .type
                                                                ]
                                                            }
                                                        </div>
                                                        <div className="wallet-transaction__item__left__description">
                                                            {formatDateTime(
                                                                transaction.date
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="wallet-transaction__item__right">
                                                        <div>
                                                            {`${
                                                                transaction.amount >
                                                                0
                                                                    ? "+ "
                                                                    : ""
                                                            }${formatMoney(
                                                                transaction.amount
                                                            )}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
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

                                    {/* <div className="wallet-transaction__item">
                                    <div className="wallet-transaction__item__left">
                                        <div className="wallet-transaction__item__left__title">
                                            Food for lunch
                                        </div>
                                        <div className="wallet-transaction__item__left__description">
                                            3:00 20/07/2022
                                        </div>
                                    </div>
                                    <div className="wallet-transaction__item__right">
                                        <div>- 300,000đ</div>
                                    </div>
                                </div>
                                <div className="wallet-transaction__item">
                                    <div className="wallet-transaction__item__left">
                                        <div className="wallet-transaction__item__left__title">
                                            Food for lunch
                                        </div>
                                        <div className="wallet-transaction__item__left__description">
                                            3:00 20/07/2022
                                        </div>
                                    </div>
                                    <div className="wallet-transaction__item__right">
                                        <div>- 300,000đ</div>
                                    </div>
                                </div> */}
                                </div>
                            )}
                        </div>
                        {/* Contact-page End */}
                    </div>
                </div>
            </section>
        </LayoutAuthed>
    );
}

export default WalletPage;
