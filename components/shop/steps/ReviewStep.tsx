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
import { GET_WALLETS } from "../../../utils/apollo/queries/wallet.queries";

interface Props {
    order: OrderState;
    onNext: () => void;
}

function ReviewStep({ order, onNext }: Props) {
    const router = useRouter();

    const { session, updateSession } = useContext(SessionContext);
    const [wallets, setWallets] = useState<Wallet[] | null>(null);

    const [getWallets, { called, loading, data }] = useLazyQuery(GET_WALLETS);

    // const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    //     PaymentMethod.BANK_TRANSFER
    // );

    useEffect(() => {
        if (session) {
            getWallets({
                variables: {
                    account_id: session.user.id,
                },
            });
        } else if (session === null) {
            router.push("/login");
        }
    }, [session]);

    useEffect(() => {
        if (data) {
            const wallets = getDataGraphqlResult(data);
            setWallets(wallets);
        }
    }, [data]);

    const mainWallet: Wallet | null = useMemo(
        () => getWallet(wallets || [], WalletType.Main),
        [wallets]
    );

    const secondaryWallet: Wallet | null = useMemo(
        () => getWallet(wallets || [], WalletType.Secondary),
        [wallets]
    );

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
                        S???n ph???m
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
                                            S??? l?????ng:{" "}
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
                            <div>Th??nh ti???n</div>
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
                        Giao h??ng
                    </p>
                    {order.shipping && (
                        <div className="">
                            {order.shipping.shippingOption ===
                                ShippingOption.SELF_GET && (
                                <p>Nh???n h??ng t???i c??ng ty</p>
                            )}
                            {order.shipping.shippingOption ===
                                ShippingOption.SHIP && (
                                <>
                                    <p>
                                        T??n ng?????i nh???n:{" "}
                                        {order.shipping.payload.name}
                                    </p>
                                    <p>
                                        S??? ??i???n tho???i:{" "}
                                        {order.shipping.payload.phone}
                                    </p>
                                    <p>
                                        ?????a ch???:{" "}
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
                        Thanh to??n
                    </p>

                    <div className="">
                        {order.paymentMethod ===
                            PaymentMethod.BANK_TRANSFER && (
                            <>
                                <p>
                                    Sau khi ?????t h??ng, vui l??ng chuy???n kho???n ?????n
                                    s??? t??i kho???n sau
                                </p>
                                <p>
                                    Ng??n h??ng: {BANK_ACCOUNT.BANK_NAME}
                                    <br />
                                    STK: {BANK_ACCOUNT.BANK_NUMBER}
                                    <br />
                                    Ch??? t??i kho???n: {BANK_ACCOUNT.BANK_ACCOUNT_NAME}
                                </p>
                            </>
                        )}
                        {order.paymentMethod ===
                            PaymentMethod.SMARTCARD_WALLET &&
                            mainWallet && (
                                <>
                                    <p>
                                        V?? smartcard - S??? d??{" "}
                                        {formatMoney(mainWallet.amount)}
                                    </p>
                                    {mainWallet.amount - 50000 < totalPrice && (
                                        <>
                                            <p>
                                                S??? ti???n trong v?? kh??ng ?????, vui
                                                l??ng qu?? kh??ch chuy???n s??? ti???n
                                                c??n l???i{" "}
                                                <strong>
                                                    {formatMoney(
                                                        totalPrice -
                                                            mainWallet.amount -
                                                            50000
                                                    )}
                                                </strong>{" "}
                                                v??o t??i kho???n
                                                <br />
                                                Ng??n h??ng:{" "}
                                                {BANK_ACCOUNT.BANK_NAME}, STK:{" "}
                                                {BANK_ACCOUNT.BANK_NUMBER}, Ch??? t??i kho???n: {BANK_ACCOUNT.BANK_ACCOUNT_NAME}
                                            </p>
                                            <p>
                                                S??? ti???n c??n l???i trong v??:
                                                50,000??
                                            </p>
                                        </>
                                    )}
                                    {mainWallet.amount - 50000 >=
                                        totalPrice && (
                                        <p>
                                            S??? ti???n c??n l???i trong v??:{" "}
                                            {formatMoney(
                                                mainWallet.amount - totalPrice
                                            )}
                                        </p>
                                    )}
                                </>
                            )}
                    </div>
                </div>
            </div>
            <button className="full-width-btn" onClick={onSubmit}>
                X??c nh???n ?????t h??ng
            </button>
        </div>
    );
}

export default ReviewStep;
