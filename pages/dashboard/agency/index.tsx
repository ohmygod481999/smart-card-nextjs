import { useQuery } from "@apollo/client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import LayoutDashboard from "../../../components/dashboard/LayoutDashboard";
import { formatDateTime, getDataGraphqlResult } from "../../../utils";
import { GET_ACCOUNTS } from "../../../utils/apollo/queries/account.queries";
import ReactPaginate from "react-paginate";
import { Account } from "../../../types/global";

function Index() {
    const { data, loading, refetch } = useQuery(GET_ACCOUNTS, {
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

    const totalCount = useMemo(() => {
        if (data) {
            return data.account_aggregate.aggregate.count;
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

    const accounts: Account[] = useMemo(() => {
        if (data) {
            return data.account;
        }
        return null;
    }, [data]);

    // console.log(accounts, totalCount);

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
                    <h1 className="h3 mb-0 text-gray-800">Danh sách đại lý</h1>

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
                                    <th scope="col">Ngày đăng ký</th>
                                    <th scope="col">Đã là đại lý</th>
                                    <th scope="col">Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts &&
                                    accounts.map((account: Account) => (
                                        <tr key={account.id}>
                                            <td>{account.id}</td>
                                            <td>{account.account_info.name}</td>
                                            <td>{account.email}</td>
                                            <td>{account.account_info.phone}</td>
                                            <td>
                                                {formatDateTime(
                                                    account.created_at,
                                                    false
                                                )}
                                            </td>
                                            <td>
                                                {account.agency
                                                    ? "Rồi"
                                                    : "chưa"}
                                            </td>
                                            <td>
                                                <Link
                                                    href={`/dashboard/agency-tree?id=${account.id}`}
                                                >
                                                    Chi tiết
                                                </Link>
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

export default Index;
