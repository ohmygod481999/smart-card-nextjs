import { useQuery } from "@apollo/client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { Wallet, WalletType, Withdrawal, WithdrawalStatus } from "../../types/global";
import { formatDateTime, formatMoney, getDataGraphqlResult } from "../../utils";
import { GET_WITHDRAW_REGISTRATIONS_ADMIN } from "../../utils/apollo/queries/registration.queries";

function WalletAdmin() {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

    const { data, loading, error, refetch } = useQuery(
        GET_WITHDRAW_REGISTRATIONS_ADMIN,
        {
            variables: {
                limit: 100,
                offset: 0,
            },
        }
    );

    // console.log(data, loading);
    useEffect(() => {
        if (!loading && data) {
            const _withdrawals: Withdrawal[] = getDataGraphqlResult(data);
            console.log(_withdrawals);
            setWithdrawals(_withdrawals);
        }
    }, [data, loading]);

    const approveAgencyHandler = useCallback(async (withdrawal: Withdrawal) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/withdrawal/accept`,
                {
                    withdrawal_id: withdrawal.id,
                }
            );
            if (res.data) {
                const { success } = res.data;
                if (success) {
                    refetch();
                }
            }
        } catch (err) {
            console.error(err);
        }

        // alert(agencyRegister.id);
    }, []);

    return (
        <LayoutDashboard>
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">
                        Danh sách đăng ký rút tiền
                    </h1>
                    {/* <a
                        href="#"
                        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                    >
                        <i className="fas fa-download fa-sm text-white-50" />{" "}
                        Generate Report
                    </a> */}
                </div>
                <div className="row">
                    {/* Earnings (Monthly) Card Example */}
                    <div
                        className="col-xl-12 col-md-12 mb-4"
                        style={{
                            height: "60vh",
                            overflowY: "scroll",
                        }}
                    >
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col">ID</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Số tiền rút</th>
                                    <th scope="col">Số dư hiện tại</th>
                                    <th scope="col">Ngân hàng</th>
                                    <th scope="col">Số tài khoản</th>
                                    <th scope="col">Ngày rút</th>
                                    <th scope="col">Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawals.map((withdrawal: Withdrawal) => {
                                    // let mainWallet: Wallet = {
                                    //     amount: 0,
                                    //     bank_name: "N/A",
                                    //     bank_number: "N/A",
                                    //     type: 0,
                                    //     id: 0,
                                    // };
                                    // agencyRegister.account.wallets.forEach(
                                    //     (wallet: any) => {
                                    //         if (
                                    //             wallet.type === WalletType.Main
                                    //         ) {
                                    //             mainWallet = wallet;
                                    //         }
                                    //     }
                                    // );
                                    return (
                                        <tr key={withdrawal.id}>
                                            <td>{withdrawal.account.id}</td>
                                            <td>{withdrawal.account.account_info.name}</td>
                                            <td>{withdrawal.account.email}</td>
                                            <td>{withdrawal.account.account_info.phone}</td>
                                            <td>
                                                {formatMoney(withdrawal.amount)}
                                            </td>
                                            <td>
                                                {/* {formatMoney(
                                                    mainWallet.amount
                                                )} */}
                                            </td>
                                            <td>{withdrawal.account.account_info.bank_name}</td>
                                            <td>{withdrawal.account.account_info.bank_number}</td>
                                            <td>
                                                {formatDateTime(
                                                    withdrawal.created_at,
                                                    false
                                                )}
                                            </td>
                                            <td>
                                                {withdrawal.status !== WithdrawalStatus.SUCCESS && (
                                                    <button
                                                        className="btn btn-sm btn-primary shadow-sm"
                                                        onClick={() =>
                                                            approveAgencyHandler(
                                                                withdrawal
                                                            )
                                                        }
                                                    >
                                                        Duyệt
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
}

export default WalletAdmin;
