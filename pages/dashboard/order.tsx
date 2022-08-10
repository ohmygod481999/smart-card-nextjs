import { useQuery } from "@apollo/client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import LayoutDashboard from "../../components/dashboard/LayoutDashboard";
import {
    Order,
    OrderStatus,
    PaymentMethod,
    ShippingOption,
    Wallet,
    WalletType,
} from "../../types/global";
import { formatDateTime, formatMoney, getDataGraphqlResult } from "../../utils";
import { GET_ORDERS } from "../../utils/apollo/queries/order.queries";
import { GET_WITHDRAW_REGISTRATIONS_ADMIN } from "../../utils/apollo/queries/registration.queries";

function WalletAdmin() {
    const [orders, setOrders] = useState<any>([]);

    const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
        variables: {
            status: OrderStatus.CREATED,
            limit: 100,
            offset: 0,
        },
    });

    // console.log(data, loading);
    useEffect(() => {
        if (!loading && data) {
            const _orders = getDataGraphqlResult(data);
            console.log(_orders);
            setOrders(_orders);
        }
    }, [data, loading]);

    const approveOrderHandler = useCallback(async (order: Order) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/order/approve`,
                {
                    order_id: order.id,
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
                        Danh sách đơn hàng
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
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Phương thức thanh toán</th>
                                    <th scope="col">Nhận hàng</th>
                                    <th scope="col">Sản phẩm</th>
                                    <th scope="col">Giá trị đơn hàng</th>
                                    <th scope="col">Ngày đặt</th>
                                    <th scope="col">Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order: Order) => {
                                    const totalPrice = order.order_items.reduce(
                                        (prev, cur) => {
                                            return (
                                                prev +
                                                cur.product.price * cur.quantity
                                            );
                                        },
                                        0
                                    );
                                    return (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.customer_name}</td>
                                            <td>{order.customer_phone}</td>
                                            <td>{order.customer_address}</td>
                                            <td>
                                                {order.payment_type ===
                                                    PaymentMethod.BANK_TRANSFER &&
                                                    "chuyển khoản"}
                                                {order.payment_type ===
                                                    PaymentMethod.SMARTCARD_WALLET &&
                                                    "Ví smartcard"}
                                            </td>
                                            <td>
                                                {order.shipping_type ===
                                                    ShippingOption.SELF_GET &&
                                                    "Đến công ty lấy hàng"}
                                                {order.shipping_type ===
                                                    ShippingOption.SHIP &&
                                                    "Ship"}
                                            </td>
                                            <td>
                                                {order.order_items.map(
                                                    (item, i) => (
                                                        <div key={i}>
                                                            {item.product.name}{" "}
                                                            x {item.quantity}
                                                        </div>
                                                    )
                                                )}
                                            </td>

                                            <td>{formatMoney(totalPrice)}</td>
                                            <td>
                                                {formatDateTime(
                                                    order.created_at
                                                )}
                                            </td>
                                            <td>
                                                {order.status !==
                                                    OrderStatus.APPROVE && (
                                                    <button
                                                        className="btn btn-sm btn-primary shadow-sm"
                                                        onClick={() =>
                                                            approveOrderHandler(
                                                                order
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
