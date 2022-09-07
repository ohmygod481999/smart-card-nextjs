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
import { PaymentMethod, Wallet, WalletType } from "../../../types/global";
import {
    BANK_ACCOUNT,
    formatMoney,
    getDataGraphqlResult,
} from "../../../utils";
import { GET_WALLET } from "../../../utils/apollo/queries/wallet.queries";

interface Props {
    onNext: () => void;
    paymentMethod: PaymentMethod | null;
    setPaymentMethod: (paymentMethod: PaymentMethod) => void;
    totalPrice: number;
}

function PaymentStep({
    onNext,
    setPaymentMethod,
    paymentMethod,
    totalPrice,
}: Props) {
    const router = useRouter();

    const { session, updateSession } = useContext(SessionContext);
    const [wallet, setWallet] = useState<Wallet | null>(null);

    const [getWallet, { called, loading, data }] = useLazyQuery(GET_WALLET, {
        fetchPolicy: "network-only",
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

    const onSubmit = useCallback(() => {
        if (paymentMethod !== null && wallet) {
            if (
                paymentMethod === PaymentMethod.WALLET &&
                wallet.balance < totalPrice + 50000
            ) {
                alert(
                    "Giá trị đơn hàng lớn hơn số dư ví có thể chi trả, vui lòng chọn phương thức thanh toán khác"
                );
            } else {
                onNext();
            }
        } else {
            alert("Vui lòng chọn phương thức thanh toán");
        }
    }, [paymentMethod, wallet]);

    console.log(paymentMethod);

    return (
        <div className="section-checkout">
            <div>
                <div className="section-checkout__step-page">
                    <div className="title-section">
                        <div className="title-section__title">
                            Phương thức thanh toán
                        </div>
                    </div>
                    <div
                        className={`withdraw-receiving-method ${
                            paymentMethod === PaymentMethod.BANK_TRANSFER
                                ? "activate"
                                : ""
                        }`}
                        onClick={() =>
                            setPaymentMethod(PaymentMethod.BANK_TRANSFER)
                        }
                    >
                        <div className="withdraw-receiving-method__logo">
                            <i className="fas fa-money-check-alt" />
                        </div>
                        <div className="withdraw-receiving-method__content">
                            <div className="title">Chuyển khoản ngân hàng</div>
                            <div className="description">
                                <div>Ngân hàng: {BANK_ACCOUNT.BANK_NAME}</div>
                                <div>
                                    Số tài khoản: {BANK_ACCOUNT.BANK_NUMBER}
                                </div>
                                <div>
                                    Chủ tài khoản:{" "}
                                    {BANK_ACCOUNT.BANK_ACCOUNT_NAME}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`withdraw-receiving-method ${
                            paymentMethod === PaymentMethod.WALLET
                                ? "activate"
                                : ""
                        }`}
                        onClick={() => setPaymentMethod(PaymentMethod.WALLET)}
                    >
                        <div className="withdraw-receiving-method__logo">
                            <i className="fas fa-wallet" />
                        </div>
                        <div className="withdraw-receiving-method__content">
                            <div className="title">Ví Smartcard</div>
                            <div className="description">
                                <div>
                                    Số dư ví chính:{" "}
                                    {formatMoney(wallet ? wallet.balance : 0)}
                                </div>
                                <div>
                                    Số dư ví phụ:{" "}
                                    {formatMoney(
                                        wallet ? wallet.secondary_balance : 0
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {paymentMethod === PaymentMethod.SMARTCARD_WALLET && (
                        <div className="">{mainWallet?.amount}</div>
                    )} */}
                </div>
            </div>
            <button className="full-width-btn" onClick={onSubmit}>
                Tiếp tục
            </button>
        </div>
    );
}

export default PaymentStep;
