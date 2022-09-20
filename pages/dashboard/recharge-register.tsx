import { useQuery } from "@apollo/client";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { RechargeRegister, RechargeRegisterStatus } from "../../types/global";
import { formatDateTime, formatMoney } from "../../utils";
import { GET_RECHARGE_REGISTRATION_PAGING } from "../../utils/apollo/queries/recharge-register.queries";

function RechargeRegisterAdmin() {
    const { data, loading, refetch } = useQuery(
        GET_RECHARGE_REGISTRATION_PAGING,
        {
            variables: {
                limit: 10,
                offset: 0,
                status: RechargeRegisterStatus.CREATED,
            },
        }
    );

    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [loadingApprove, setLoadingApprove] = useState(false);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    const totalCount = useMemo(() => {
        if (data) {
            return data.recharge_register_aggregate.aggregate.count;
        }
        return null;
    }, [data]);

    useEffect(() => {
        // Fetch items from another resources.
        if (totalCount) {
            refetch({
                limit: limit,
                offset: itemOffset,
            });
            setPageCount(Math.ceil(totalCount / limit));
        }
    }, [totalCount, itemOffset, limit]);

    const rechargeRegisters: RechargeRegister[] = useMemo(() => {
        if (data) {
            return data.recharge_register;
        }
        return null;
    }, [data]);

    // console.log(electricBillInfos, totalCount);

    const handlePageClick = (event: any) => {
        if (totalCount) {
            const newOffset = (event.selected * limit) % totalCount;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        }
    };

    const approveRechargeHandler = async (
        rechargeRegister: RechargeRegister
    ) => {
        console.log(rechargeRegister);
        try {
            setLoadingApprove(true);
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/wallet/approve-recharge`,
                {
                    recharge_register_id: rechargeRegister.id,
                }
            );
            console.log(res.data);
            refetch({
                limit: limit,
                offset: itemOffset,
            });
            setLoadingApprove(false);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <LayoutDashboard>
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Đăng ký nạp tiền</h1>
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="activated"
                        // renderOnZeroPageCount={null}
                    />
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
                                    {/* <th scope="col">Tên</th> */}
                                    <th scope="col">Email</th>
                                    <th scope="col">Số tiền nạp</th>
                                    <th scope="col">Ngày đăng ký</th>
                                    <th scope="col">Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rechargeRegisters &&
                                    rechargeRegisters.map(
                                        (
                                            rechargeRegister: RechargeRegister
                                        ) => (
                                            <tr key={rechargeRegister.id}>
                                                <td>
                                                    {
                                                        rechargeRegister.account
                                                            .id
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        rechargeRegister.account
                                                            .email
                                                    }
                                                </td>
                                                <td>
                                                    {formatMoney(
                                                        rechargeRegister.amount
                                                    )}
                                                </td>
                                                <td>
                                                    {formatDateTime(
                                                        rechargeRegister.created_at,
                                                        false
                                                    )}
                                                </td>
                                                <td>
                                                    {rechargeRegister.status !==
                                                        RechargeRegisterStatus.CREATED && (
                                                        <button
                                                            disabled={
                                                                loadingApprove
                                                            }
                                                            className="btn btn-sm btn-primary shadow-sm"
                                                            onClick={() =>
                                                                approveRechargeHandler(
                                                                    rechargeRegister
                                                                )
                                                            }
                                                        >
                                                            Duyệt
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
}

export default RechargeRegisterAdmin;
