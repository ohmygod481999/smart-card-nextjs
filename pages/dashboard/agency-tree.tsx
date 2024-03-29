import React, { useEffect, useMemo, useRef, useState } from "react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import Row, { RefereeRecord } from "../../components/TableHaveChildren/Row";
import _ from "lodash";
import { apolloClient } from "../../utils/apollo";
import { GET_REFEREES_BY_ACCOUNT_ID } from "../../utils/apollo/queries/account.queries";
import {
    AGENCY_PRICE,
    CARD_PRICE,
    formatDateTime,
    formatMoney,
    getDataGraphqlResult,
    getWallet,
    PERCENT_AGENCY,
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
import axios from "axios";
import AgencyStatistic from "../../components/dashboard/AgencyStatistic";
import { useRouter } from "next/router";

function AgencyTree() {
    const router = useRouter();

    const { id } = router.query;

    const idUserRef = useRef<HTMLInputElement>(null);

    const [userId, setUserId] = useState<number | null>(null);
    const [isAgency, setIsAgency] = useState<boolean | null>(null);
    const [agencyTree, setAgencyTree] = useState<any[] | null>(null);

    const [referees, setReferees] = useState<RefereeRecord[] | null>(null);
    const [wallets, setWallets] = useState<Wallet[] | null>(null);

    const [mainWalletTransactions, setMainWalletTransactions] = useState<
        Transaction[] | null
    >(null);

    useEffect(() => {
        if (id && router.isReady && idUserRef && idUserRef.current) {
            idUserRef.current.value = String(id);
            onSubmitUserId();
        }
    }, [id, router.isReady, idUserRef]);

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
                    if (_referees && _referees.length > 0) {
                        setIsAgency(_referees[0].is_agency);
                    }
                    setReferees(_referees);
                });
        }
    }, [userId]);

    useEffect(() => {
        if (userId && isAgency !== null) {
            axios
                .get(`${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/agency/children/${userId}`)
                .then((res) => {
                    if (res.data) {
                        const children = res.data.data;
                        const tree = [[children[0]]];
                        let currentLevel = 0;
                        let currentItems = [];
                        const limit =
                            children.length < 2
                                ? 1
                                : children.length;

                        for (let i = 1; i < limit; i++) {
                            if (
                                tree[currentLevel]
                                    .map((item) => item.id)
                                    .includes(children[i].referer_id)
                            ) {
                                currentItems.push(children[i]);
                            } else {
                                currentLevel += 1;
                                tree.push(currentItems);
                                currentItems = [children[i]];
                            }
                        }
                        tree.push(currentItems);
                        setAgencyTree(tree);
                    }
                });
        }
    }, [userId, isAgency]);

    const onSubmitUserId = () => {
        const idUser = parseInt(_.get(idUserRef, "current.value"));
        setUserId(idUser);
    };

    const mainWallet: Wallet | null = useMemo(
        () => getWallet(wallets || [], WalletType.Main),
        [wallets]
    );

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
                <div className="mb-3">
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
                {userId && (
                    <div
                        className="col-lg-12 col-12"
                        style={{
                            height: "65vh",
                            overflowY: "scroll",
                        }}
                    >
                        <div className="mb-3">
                            <h3 className="h5 mb-0 text-gray-800">
                                Số dư ví hiện tại:{" "}
                                {mainWallet && formatMoney(mainWallet.amount)}
                            </h3>
                        </div>
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
                                Thống kê:{" "}
                            </h3>
                            {isAgency !== null &&
                                agencyTree &&
                                mainWalletTransactions && (
                                    <AgencyStatistic
                                        agencyTree={agencyTree}
                                        withdrawTransactions={
                                            mainWalletTransactions
                                                ? mainWalletTransactions.filter(
                                                      (tst) =>
                                                          tst.type ===
                                                          TransactionType.WITHDRAW
                                                  )
                                                : null
                                        }
                                        isAgency={isAgency}
                                    />
                                )}
                        </div>

                        <div className="mb-3">
                            <h3 className="h5 mb-0 text-gray-800">
                                Số lần rút
                            </h3>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Số tiền rút</th>
                                            <th scope="col">Ngày</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mainWalletTransactions &&
                                            mainWalletTransactions
                                                .filter(
                                                    (tst) =>
                                                        tst.type ===
                                                        TransactionType.WITHDRAW
                                                )
                                                .map((tst, i) => (
                                                    <tr key={tst.id}>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            -{" "}
                                                            {formatMoney(
                                                                tst.amount
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatDateTime(
                                                                tst.date
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                    </tbody>
                                </table>
                            </div>
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
                )}
            </div>
        </LayoutDashboard>
    );
}

export default AgencyTree;
