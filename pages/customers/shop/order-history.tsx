import { useLazyQuery, useQuery } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo } from "react";
import LayoutAuthed from "../../../components/LayoutAuthed";
import SectionLayout from "../../../components/SectionLayout";
import SessionContext from "../../../context/session-context";
import { Order, OrderStatus } from "../../../types/global";
import {
    formatDateTime,
    formatMoney,
    getDataGraphqlResult,
    ORDER_STATUS_MAPPING,
    paddingId,
} from "../../../utils";
import { GET_ALL_ORDER_BY_ACCOUNT_ID } from "../../../utils/apollo/queries/order.queries";

function OrderHistory() {
    const router = useRouter();

    const { session, updateSession } = useContext(SessionContext);

    const [getOrders, { called, loading, data, refetch }] = useLazyQuery(
        GET_ALL_ORDER_BY_ACCOUNT_ID
    );

    useEffect(() => {
        if (session && !called) {
            getOrders({
                variables: {
                    account_id: session.user.id,
                    // status: OrderStatus.CREATED,
                },
                fetchPolicy: "network-only",
            });
        } else if (session === null) {
            router.push("/login");
        }
    }, [session, called]);

    const orders: Order[] | null = useMemo(() => {
        if (data) {
            const _orders: Order[] = getDataGraphqlResult(data);
            return _orders.map((order) => {
                let totalPrice = 0;
                order.order_items.map((item) => {
                    totalPrice += item.product.price * item.quantity;
                });
                return {
                    ...order,
                    totalPrice,
                };
            });
        }
        return null;
    }, [data]);

    console.log(orders);

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Lịch sử nhập hàng</title>
            </Head>
            <SectionLayout>
                <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                    <h1 className="left-title">
                        <button className="back-btn">
                            <Link href={"/customers"}>
                                <Image
                                    src="/icon/back.png"
                                    width={22}
                                    height={22}
                                />
                            </Link>
                        </button>{" "}
                        Lịch sử <span>nhập hàng</span>
                    </h1>
                    <div className="animated-bar left" />
                </div>
                <div className="col-lg-12 col-12 table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th scope="col">#</th> */}
                                <th scope="col">Mã đơn hàng</th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Giá trị</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Ngày tạo</th>
                                {/* <th scope="col">Lượt giới thiệu</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        Trống
                                    </td>
                                </tr>
                            )}
                            {orders &&
                                orders.map((order) => {
                                    return (
                                        <tr key={order.id}>
                                            {/* <th scope="row"></th> */}
                                            <td>#{paddingId(order.id)}</td>
                                            <td>
                                                <div>
                                                    {order.order_items.map(
                                                        (item) => (
                                                            <div
                                                                key={
                                                                    item.product_id
                                                                }
                                                            >
                                                                -{" "}
                                                                <strong>
                                                                    {
                                                                        item
                                                                            .product
                                                                            .name
                                                                    }
                                                                </strong>
                                                                . SL:{" "}
                                                                {item.quantity}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                {order.totalPrice
                                                    ? formatMoney(
                                                          order.totalPrice
                                                      )
                                                    : "N/A"}
                                            </td>
                                            <td>
                                                {
                                                    ORDER_STATUS_MAPPING[
                                                        order.status
                                                    ]
                                                }
                                            </td>
                                            <td>
                                                {formatDateTime(
                                                    order.created_at,
                                                    false
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default OrderHistory;
