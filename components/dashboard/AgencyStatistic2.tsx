import React, { useEffect, useMemo, useState } from "react";
import { Transaction } from "../../types/global";
import { formatDateTime, formatMoney } from "../../utils";
import { apolloClient } from "../../utils/apollo";
import { GET_REFER_AGENCY_TRANSACTIONS_BY_ACCOUNT, GET_REFER_COLABORATOR_TRANSACTIONS_BY_ACCOUNT } from "../../utils/apollo/queries/transaction.queries";

function AgencyStatistic2({ account_id }: { account_id: number }) {
    const [agencyTransactions, setAgencyTransactions] = useState<Transaction[]>(
        []
    );
    const [colaboratorTransactions, setColaboratorTransactions] = useState<Transaction[]>(
        []
    );

    useEffect(() => {
        apolloClient
            .query({
                query: GET_REFER_AGENCY_TRANSACTIONS_BY_ACCOUNT,
                variables: {
                    account_id,
                },
            })
            .then(({ data }) => {
                setAgencyTransactions(data.transaction);
            });
        apolloClient
            .query({
                query: GET_REFER_COLABORATOR_TRANSACTIONS_BY_ACCOUNT,
                variables: {
                    account_id,
                },
            })
            .then(({ data }) => {
                setColaboratorTransactions(data.transaction);
            });
    }, [account_id]);

    const totalAgencyIncome = useMemo(() => {
        let total = 0;
        agencyTransactions.forEach((t) => {
            total += t.amount;
        });
        return total;
    }, [agencyTransactions]);

    const totalColaboratorIncome = useMemo(() => {
        let total = 0;
        colaboratorTransactions.forEach((t) => {
            total += t.amount;
        });
        return total;
    }, [colaboratorTransactions]);

    return (
        <div>
            <p className="mb-3 mt-3">1. Các đại lý mới đăng ký</p>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tầng giới thiệu</th>
                            <th scope="col">ID Nguời giới thiệu trực tiếp</th>
                            <th scope="col">ID Đại lý</th>
                            <th scope="col">Email Đại lý</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Số tiền được hưởng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agencyTransactions.map((agencyTransaction, i) => (
                            <tr key={agencyTransaction.id}>
                                <td>{i + 1}</td>
                                <td>{agencyTransaction.referral?.level}</td>
                                <td>{agencyTransaction.referral?.accountByRefererId.id}</td>
                                <td>
                                    {agencyTransaction.referral?.account.id}
                                </td>
                                <td>
                                    {agencyTransaction.referral?.account.email}
                                </td>
                                <td>
                                    {formatDateTime(
                                        agencyTransaction.created_at
                                    )}
                                </td>
                                <td>{formatMoney(agencyTransaction.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}></td>
                            <td>Tổng:</td>
                            <td>{formatMoney(totalAgencyIncome)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <p className="mb-3 mt-3">1. Các CTV mới đăng ký</p>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tầng giới thiệu</th>
                            <th scope="col">ID Người giới thiệu trực tiếp</th>
                            <th scope="col">ID CTV</th>
                            <th scope="col">Email CTV</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Số tiền được hưởng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colaboratorTransactions.map((colaboratorTransaction, i) => (
                            <tr key={colaboratorTransaction.id}>
                                <td>{i + 1}</td>
                                <td>{colaboratorTransaction.referral?.level}</td>
                                <td>{colaboratorTransaction.referral?.accountByRefererId.id}</td>
                                <td>
                                    {colaboratorTransaction.referral?.account.id}
                                </td>
                                <td>
                                    {colaboratorTransaction.referral?.account.email}
                                </td>
                                <td>
                                    {formatDateTime(
                                        colaboratorTransaction.created_at
                                    )}
                                </td>
                                <td>{formatMoney(colaboratorTransaction.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}></td>
                            <td>Tổng:</td>
                            <td>{formatMoney(totalColaboratorIncome)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default AgencyStatistic2;
