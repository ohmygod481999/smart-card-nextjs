import React, { useEffect, useMemo, useRef, useState } from "react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import Row, { RefereeRecord } from "../../components/TableHaveChildren/Row";
import _ from "lodash";
import { apolloClient } from "../../utils/apollo";
import { GET_REFEREES_BY_ACCOUNT_ID } from "../../utils/apollo/queries/account.queries";
import {
    formatDateTime,
    formatMoney,
    getDataGraphqlResult,
    getWallet,
    transactionMapping,
} from "../../utils";
import {
    Transaction,
    TransactionType,
    Wallet,
    WalletType,
} from "../../types/global";
import { GET_TRANSATION } from "../../utils/apollo/queries/transaction.queries";
import { GET_WALLETS } from "../../utils/apollo/queries/wallet.queries";

function AgencyTree() {
    const idUserRef = useRef(null);

    const [userId, setUserId] = useState<number | null>(null);

    const [referees, setReferees] = useState<RefereeRecord[] | null>(null);
    const [wallets, setWallets] = useState<Wallet[] | null>(null);

    const [mainWalletTransactions, setMainWalletTransactions] = useState<
        Transaction[] | null
    >(null);

    useEffect(() => {
        if (userId) {
            apolloClient
                .query({
                    query: GET_WALLETS,
                    variables: {
                        account_id: userId,
                    },
                })
                .then(({ data }) => {
                    const wallets = getDataGraphqlResult(data);
                    setWallets(wallets);
                    const mainWallet = getWallet(
                        wallets || [],
                        WalletType.Main
                    );
                    const secondaryWallet = getWallet(
                        wallets || [],
                        WalletType.Secondary
                    );

                    if (mainWallet && secondaryWallet) {
                        apolloClient
                            .query({
                                query: GET_TRANSATION,
                                variables: {
                                    account_id: userId,
                                },
                            })
                            .then(({ data }) => {
                                const transactions = getDataGraphqlResult(data);
                                console.log(transactions);
                                const mainTransactions: Transaction[] = [];
                                const secondaryTransactions: Transaction[] = [];
                                transactions.forEach(
                                    (transaction: Transaction) => {
                                        if (
                                            transaction.wallet_id ===
                                                mainWallet.id ||
                                            transaction.from_wallet_id ===
                                                mainWallet.id
                                        ) {
                                            mainTransactions.push(transaction);
                                        } else if (
                                            transaction.wallet_id ===
                                                secondaryWallet.id ||
                                            transaction.from_wallet_id ===
                                                secondaryWallet.id
                                        ) {
                                            secondaryTransactions.push(
                                                transaction
                                            );
                                        }
                                    }
                                );
                                setMainWalletTransactions(mainTransactions);
                                // setSecondaryWalletTransactions(
                                //     secondaryTransactions
                                // );
                            });
                    }
                });
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            apolloClient
                .query({
                    query: GET_REFEREES_BY_ACCOUNT_ID,
                    variables: {
                        id: userId,
                    },
                })
                .then(({ data }) => {
                    const _referees = getDataGraphqlResult(data);
                    setReferees(_referees);
                });
        }
    }, [userId]);

    const onSubmitUserId = () => {
        console.log(_.get(idUserRef, "current.value"));
        const idUser = parseInt(_.get(idUserRef, "current.value"));
        console.log(idUser);
        setUserId(idUser);
    };

    const mainWallet: Wallet | null = useMemo(
        () => getWallet(wallets || [], WalletType.Main),
        [wallets]
    );
    console.log(mainWallet);

    return (
        <LayoutDashboard>
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Sơ đồ hệ thống</h1>
                    {/* <a
                    href="#"
                    className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                >
                    <i className="fas fa-download fa-sm text-white-50" />{" "}
                    Generate Report
                </a> */}
                </div>
                <div>
                    <input
                        ref={idUserRef}
                        className="form-control"
                        placeholder="Nhập ID user"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSubmitUserId();
                            }
                        }}
                    />
                </div>
                <div
                    className="col-lg-12 col-12"
                    style={{
                        height: "65vh",
                        overflowY: "scroll",
                    }}
                >
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Ngày tham gia</th>
                                    <th scope="col">Là đại lý</th>
                                    <th scope="col">Lượt giới thiệu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referees &&
                                    referees.map((referee) => (
                                        <Row
                                            key={referee.id}
                                            level={0}
                                            referee={referee}
                                            moreExpand={referee.is_agency}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-3">
                        <h3 className="h5 mb-0 text-gray-800">
                            Số dư ví:{" "}
                            {mainWallet && formatMoney(mainWallet.amount)}
                        </h3>
                    </div>
                    <div className="">
                        <h3 className="h5 mb-0 text-gray-800">
                            Danh sách giao dịch
                        </h3>
                        <div className="wallet-transaction">
                            {mainWalletTransactions ? (
                                mainWalletTransactions.length > 0 ? (
                                    mainWalletTransactions.map(
                                        (transaction) => (
                                            <div
                                                key={transaction.id}
                                                className="wallet-transaction__item"
                                            >
                                                <div className="wallet-transaction__item__left">
                                                    <div className="wallet-transaction__item__left__title">
                                                        {
                                                            transactionMapping[
                                                                transaction.type
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
                                                            transaction.type !==
                                                            TransactionType.WITHDRAW
                                                                ? "+ "
                                                                : "- "
                                                        }${formatMoney(
                                                            transaction.amount
                                                        )}`}
                                                    </div>
                                                </div>
                                            </div>
                                        )
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
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
}

export default AgencyTree;
