import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import { BillInfoType, ElectricBillInfo } from "../../types/global";
import { formatDateTime } from "../../utils";
import { GET_BILL_INFOS_PAGING } from "../../utils/apollo/queries/bill-info.queries";

function ElectricRegister() {
    const { data, loading, refetch } = useQuery(GET_BILL_INFOS_PAGING, {
        variables: {
            limit: 10,
            offset: 0,
            type: BillInfoType.ELECTRIC,
        },
    });

    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    const totalCount = useMemo(() => {
        if (data) {
            return data.bill_info_aggregate.aggregate.count;
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

    const electricBillInfos: ElectricBillInfo[] = useMemo(() => {
        if (data) {
            return data.bill_info;
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

    return (
        <LayoutDashboard>
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Đăng ký tiền điện</h1>
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
                                    <th scope="col">Nhà cung cấp</th>
                                    <th scope="col">Mã khách hàng</th>
                                    <th scope="col">Số điện thoại người thanh toán</th>
                                    <th scope="col">Ngày đăng ký</th>
                                    <th scope="col">Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {electricBillInfos &&
                                    electricBillInfos.map((billInfo: ElectricBillInfo) => (
                                        <tr key={billInfo.id}>
                                            <td>{billInfo.account.id}</td>
                                            <td>{billInfo.account.email}</td>
                                            <td>{billInfo.payload.provider}</td>
                                            <td>{billInfo.payload.billcode}</td>
                                            <td>{billInfo.payload.phone}</td>
                                            <td>
                                                {formatDateTime(
                                                    billInfo.created_at,
                                                    false
                                                )}
                                            </td>
                                            <td>

                                                {/* <Link
                                                    href={`/dashboard/agency-tree?id=${account.id}`}
                                                >
                                                    Chi tiết
                                                </Link> */}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
}

export default ElectricRegister;
