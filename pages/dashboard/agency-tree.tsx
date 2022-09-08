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
    PERCENT_AGENCY,
    transactionMapping,
} from "../../utils";
import {
    AgencyType,
    Transaction,
    Wallet,
    WalletType,
    Withdrawal,
} from "../../types/global";
import {
    GET_PAYMENT_TRANSATION,
    GET_TRANSATIONS,
    GET_TRANSFER_TRANSATION,
} from "../../utils/apollo/queries/transaction.queries";
import { GET_WALLET } from "../../utils/apollo/queries/wallet.queries";
import axios from "axios";
import AgencyStatistic from "../../components/dashboard/AgencyStatistic";
import { useRouter } from "next/router";
import { GET_WITHDRAWALS_BY_ACCOUNT_ID } from "../../utils/apollo/queries/withdrawal.queries";

function AgencyTree() {
    const router = useRouter();

    const { id } = router.query;

    const idUserRef = useRef<HTMLInputElement>(null);

    const [userId, setUserId] = useState<number | null>(null);
    const [isAgency, setIsAgency] = useState<boolean | null>(null);
    const [agencyTree, setAgencyTree] = useState<any[] | null>(null);

    const [referees, setReferees] = useState<RefereeRecord[] | null>(null);
    const [wallet, setWallet] = useState<Wallet | null>(null);

    const [paymentTransactions, setPaymentTransactions] = useState<
        Transaction[]
    >([]);
    const [transferTransactions, setTransferTransactions] = useState<
        Transaction[]
    >([]);
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

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
                    query: GET_WALLET,
                    variables: {
                        account_id: userId,
                    },
                    context: {
                        headers: {
                            "x-hasura-user-id": userId,
                        },
                    },
                    fetchPolicy: "network-only",
                })
                .then(({ data }) => {
                    const wallet = getDataGraphqlResult(data);
                    setWallet(wallet);
                });

            apolloClient
                .query({
                    query: GET_WITHDRAWALS_BY_ACCOUNT_ID,
                    variables: {
                        account_id: userId,
                    },
                })
                .then(({ data }) => {
                    if (data) {
                        setWithdrawals(getDataGraphqlResult(data));
                    }
                });

            apolloClient
                .query({
                    query: GET_PAYMENT_TRANSATION,
                    variables: {
                        account_id: userId,
                    },
                })
                .then(({ data }) => {
                    if (data) {
                        setPaymentTransactions(getDataGraphqlResult(data));
                    }
                });
            apolloClient
                .query({
                    query: GET_TRANSFER_TRANSATION,
                    variables: {
                        account_id: userId,
                    },
                })
                .then(({ data }) => {
                    if (data) {
                        setTransferTransactions(getDataGraphqlResult(data));
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
                        setIsAgency(_referees[0].agency);
                    }
                    setReferees(_referees);
                });
        }
    }, [userId]);

    console.log(isAgency);

    useEffect(() => {
        if (userId) {
            axios
                .get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/account/decendants/${userId}`
                    // http://longvb.ddns.net:3010/account/decendants/35
                )
                .then((res) => {
                    if (res.data) {
                        const children = res.data;

                        // console.log(res.data);
                        const tree = [[{
                            ...children[0],
                            is_agency: children[0].type === AgencyType.AGENCY
                        }]];
                        let currentLevel = 0;
                        let currentItems = [];
                        const limit = children.length < 2 ? 1 : children.length;

                        for (let i = 1; i < limit; i++) {
                            if (
                                tree[currentLevel]
                                    .map((item) => item.id)
                                    .includes(children[i].referer_id)
                            ) {
                                currentItems.push({
                                    ...children[i],
                                    is_agency: children[i].type === AgencyType.AGENCY
                                });
                            } else {
                                currentLevel += 1;
                                tree.push(currentItems);
                                currentItems = [{
                                    ...children[i],
                                    is_agency: children[i].type === AgencyType.AGENCY
                                }];
                            }
                        }
                        tree.push(currentItems);
                        console.log(tree);
                        setAgencyTree(tree);
                    }
                });
        }
    }, [userId, isAgency]);

    const onSubmitUserId = () => {
        const idUser = parseInt(_.get(idUserRef, "current.value"));
        setUserId(idUser);
    };

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
                                {wallet && formatMoney(wallet.balance)}
                            </h3>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Tên</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Ngày tham gia</th>
                                        <th scope="col">Là đại lý</th>
                                        <th scope="col">Ngày thành đại lý</th>
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
                                                moreExpand={
                                                    referee.agency
                                                        ? true
                                                        : false
                                                }
                                            />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mb-3">
                            <h3 className="h5 mb-0 text-gray-800">
                                Thống kê:{" "}
                            </h3>
                            <p>Đang trong giai đoạn phát triển</p>
                            {/* {agencyTree && withdrawals && (
                                <AgencyStatistic
                                    account_id={userId}
                                    agencyTree={agencyTree}
                                    withdrawTransactions={withdrawals}
                                    paymentTransactions={paymentTransactions}
                                    transferTransactions={transferTransactions}
                                    isAgency={isAgency ? true : false}
                                />
                            )} */}
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
                                        {withdrawals &&
                                            withdrawals.map((withdrawal, i) => (
                                                <tr key={withdrawal.id}>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        -{" "}
                                                        {formatMoney(
                                                            withdrawal.amount
                                                        )}
                                                    </td>
                                                    <td>
                                                        {formatDateTime(
                                                            withdrawal.created_at
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mb-3">
                            <h3 className="h5 mb-0 text-gray-800">
                                Giao dịch thanh toán
                            </h3>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">
                                                Số tiền thanh toán
                                            </th>
                                            <th scope="col">Ngày</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentTransactions &&
                                            paymentTransactions.map(
                                                (transaction, i) => (
                                                    <tr key={transaction.id}>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            -{" "}
                                                            {formatMoney(
                                                                transaction.amount
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatDateTime(
                                                                transaction.created_at
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h3 className="h5 mb-0 text-gray-800">
                                Giao dịch chuyển tiền
                            </h3>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Loại</th>
                                            <th scope="col">Từ ID</th>
                                            <th scope="col">Đến ID</th>
                                            <th scope="col">Số tiền</th>
                                            <th scope="col">Ngày</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transferTransactions &&
                                            transferTransactions.map(
                                                (transaction, i) => (
                                                    <tr key={transaction.id}>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            {transaction.source_id ===
                                                            userId
                                                                ? "Chuyển tiền"
                                                                : "Nhận tiền"}
                                                        </td>
                                                        <td>
                                                            {
                                                                transaction.source_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                transaction.target_id
                                                            }
                                                        </td>
                                                        <td>
                                                            {transaction.source_id ===
                                                            userId
                                                                ? "-"
                                                                : "+"}{" "}
                                                            {formatMoney(
                                                                transaction.amount
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatDateTime(
                                                                transaction.created_at
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* <div className="">
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
                        </div> */}
                    </div>
                )}
            </div>
        </LayoutDashboard>
    );
}

export default AgencyTree;
