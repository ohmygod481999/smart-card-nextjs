import { useQuery } from "@apollo/client";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import {
    BillInfoType,
    ElectricBillInfo,
    ErpAccount,
    ErpAccountStatus,
} from "../../types/global";
import { formatDateTime } from "../../utils";
import { GET_BILL_INFOS_PAGING } from "../../utils/apollo/queries/bill-info.queries";
import { GET_ERP_REGISTRATION_PAGING } from "../../utils/apollo/queries/erp-account.queries";

function ErpRegister() {
    const { data, loading, refetch } = useQuery(GET_ERP_REGISTRATION_PAGING, {
        variables: {
            limit: 10,
            offset: 0,
        },
    });

    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    const [loadingApprove, setLoadingApprove] = useState(false);

    const totalCount = useMemo(() => {
        if (data) {
            return data.erp_account_aggregate.aggregate.count;
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

    const erpRegistrations: ErpAccount[] = useMemo(() => {
        if (data) {
            return data.erp_account;
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

    const approveErpHandler = async (erpAccount: ErpAccount) => {
        console.log(erpAccount);
        setLoadingApprove(true);
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/erp/approve`,
            {
                erp_account_id: erpAccount.id,
            }
        );
        console.log(res.data);
        refetch({
            limit: limit,
            offset: itemOffset,
        });
        setLoadingApprove(false);
    };

    return (
        <LayoutDashboard>
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">
                        Đăng ký tài khoản doanh nghiệp
                    </h1>
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
                                    <th scope="col">Ngày đăng ký</th>
                                    <th scope="col">Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {erpRegistrations &&
                                    erpRegistrations.map(
                                        (erpRegistration: ErpAccount) => (
                                            <tr key={erpRegistration.id}>
                                                <td>
                                                    {erpRegistration.account.id}
                                                </td>
                                                <td>
                                                    {
                                                        erpRegistration.account
                                                            .email
                                                    }
                                                </td>
                                                <td>
                                                    {formatDateTime(
                                                        erpRegistration.created_at,
                                                        false
                                                    )}
                                                </td>
                                                <td>
                                                    {erpRegistration.status !==
                                                        ErpAccountStatus.APPROVED && (
                                                        <button
                                                            disabled={
                                                                loadingApprove
                                                            }
                                                            className="btn btn-sm btn-primary shadow-sm"
                                                            onClick={() =>
                                                                approveErpHandler(
                                                                    erpRegistration
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

export default ErpRegister;
