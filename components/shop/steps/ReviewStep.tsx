import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import SessionContext from "../../../context/session-context";
import {
    CartItem,
    OrderState,
    PaymentMethod,
    ShippingOption,
    Wallet,
    WalletType,
} from "../../../types/global";
import {
    BANK_ACCOUNT,
    formatMoney,
    getDataGraphqlResult,
    getWallet,
} from "../../../utils";
import { GET_WALLET } from "../../../utils/apollo/queries/wallet.queries";

interface Props {
    order: OrderState;
    onNext: () => void;
}

function ReviewStep({ order, onNext }: Props) {
    const router = useRouter();

    const { session, updateSession } = useContext(SessionContext);
    const [wallet, setWallet] = useState<Wallet | null>(null);

    const [getWallet, { called, loading, data }] = useLazyQuery(GET_WALLET, {
        fetchPolicy: "network-only"
    });

    // const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    //     PaymentMethod.BANK_TRANSFER
    // );

    useEffect(() => {
        if (session) {
            getWallet({
                variables: {
                    account_id: session.user.id,
                },
                context: {
                    headers: {
                        "x-hasura-user-id": session.user.id,
                    },
                },
            });
        } else if (session === null) {
            router.push("/login");
        }
    }, [session]);

    useEffect(() => {
        if (data) {
            const _wallet = getDataGraphqlResult(data);
            setWallet(_wallet);
        }
    }, [data]);

    const cartItems: CartItem[] | null = useMemo(() => {
        const cartItemsJson = localStorage.getItem("cart");
        return cartItemsJson ? JSON.parse(cartItemsJson) : null;
    }, []);
    
    const totalPrice = useMemo(() => {
        if (!cartItems) return 0;
        return cartItems.reduce((prev, cur) => {
            return prev + cur.quantity * cur.product.price;
        }, 0);
    }, [cartItems]);

    const onSubmit = useCallback(() => {
        onNext();
    }, [onNext]);

    return (
        <div className="section-checkout">
            <div>
                <div className="section-checkout__step-page">
                    <p
                        style={{
                            borderBottom: "1px solid",
                        }}
                    >
                        Sản phẩm
                    </p>
                    <div className="order-summary-cart">
                        {cartItems &&
                            cartItems.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="order-summary-cart__item"
                                >
                                    <div className="right">
                                        <h5
                                            style={{
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            {item.product.name}
                                        </h5>
                                        <p>
                                            Số lượng:{" "}
                                            <strong>{item.quantity}</strong>
                                        </p>
                                    </div>
                                    <div className="order-summary-cart__item-price">
                                        {formatMoney(item.product.price)}
                                    </div>
                                </div>
                            ))}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 20,
                            }}
                        >
                            <div>Thành tiền</div>
                            <div>
                                <strong>{formatMoney(totalPrice)}</strong>
                            </div>
                        </div>
                    </div>
                    <p
                        style={{
                            borderBottom: "1px solid",
                        }}
                    >
                        Giao hàng
                    </p>
                    {order.shipping && (
                        <div className="">
                            {order.shipping.shippingOption ===
                                ShippingOption.SELF_GET && (
                                <p>Nhận hàng tại công ty</p>
                            )}
                            {order.shipping.shippingOption ===
                                ShippingOption.SHIP && (
                                <>
                                    <p>
                                        Tên người nhận:{" "}
                                        {order.shipping.payload.name}
                                    </p>
                                    <p>
                                        Số điện thoại:{" "}
                                        {order.shipping.payload.phone}
                                    </p>
                                    <p>
                                        Địa chỉ:{" "}
                                        {order.shipping.payload.address}
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                    <p
                        style={{
                            borderBottom: "1px solid",
                        }}
                    >
                        Thanh toán
                    </p>

                    <div className="">
                        {order.paymentMethod ===
                            PaymentMethod.BANK_TRANSFER && (
                            <>
                                <p>
                                    Sau khi đặt hàng, vui lòng chuyển khoản đến
                                    số tài khoản sau
                                </p>
                                <p>
                                    Ngân hàng: {BANK_ACCOUNT.BANK_NAME}
                                    <br />
                                    STK: {BANK_ACCOUNT.BANK_NUMBER}
                                    <br />
                                    Chủ tài khoản: {BANK_ACCOUNT.BANK_ACCOUNT_NAME}
                                </p>
                            </>
                        )}
                        {order.paymentMethod ===
                            PaymentMethod.WALLET &&
                            wallet && (
                                <>
                                    <p>
                                        Ví smartcard - Số dư{" "}
                                        {formatMoney(wallet.balance)}
                                    </p>
                                    {wallet.balance - 50000 < totalPrice && (
                                        <>
                                            <p>
                                                Số tiền trong ví không đủ, vui
                                                lòng quý khách chuyển số tiền
                                                còn lại{" "}
                                                <strong>
                                                    {formatMoney(
                                                        totalPrice -
                                                            wallet.balance -
                                                            50000
                                                    )}
                                                </strong>{" "}
                                                vào tài khoản
                                                <br />
                                                Ngân hàng:{" "}
                                                {BANK_ACCOUNT.BANK_NAME}, STK:{" "}
                                                {BANK_ACCOUNT.BANK_NUMBER}, Chủ tài khoản: {BANK_ACCOUNT.BANK_ACCOUNT_NAME}
                                            </p>
                                            <p>
                                                Số tiền còn lại trong ví:
                                                50,000đ
                                            </p>
                                        </>
                                    )}
                                    {wallet.balance - 50000 >=
                                        totalPrice && (
                                        <p>
                                            Số tiền còn lại trong ví:{" "}
                                            {formatMoney(
                                                wallet.balance - totalPrice
                                            )}
                                        </p>
                                    )}
                                </>
                            )}
                    </div>
                </div>
            </div>
            <button className="full-width-btn" onClick={onSubmit}>
                Xác nhận đặt hàng
            </button>
        </div>
    );
}

export default ReviewStep;
