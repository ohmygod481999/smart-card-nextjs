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
import { BANK_ACCOUNT, formatMoney, getDataGraphqlResult, getWallet } from "../../../utils";
import { GET_WALLETS } from "../../../utils/apollo/queries/wallet.queries";

interface Props {
    onNext: () => void;
    paymentMethod: PaymentMethod | null;
    setPaymentMethod: (paymentMethod: PaymentMethod) => void;
}

function PaymentStep({ onNext, setPaymentMethod, paymentMethod }: Props) {
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

    const onSubmit = useCallback(() => {
        if (paymentMethod !== null) {
            onNext();
        } else {
            alert("Vui lòng chọn phương thức thanh toán");
        }
    }, [paymentMethod]);

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
                                <div>Số tài khoản: {BANK_ACCOUNT.BANK_NUMBER}</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`withdraw-receiving-method ${
                            paymentMethod === PaymentMethod.SMARTCARD_WALLET
                                ? "activate"
                                : ""
                        }`}
                        onClick={() =>
                            setPaymentMethod(PaymentMethod.SMARTCARD_WALLET)
                        }
                    >
                        <div className="withdraw-receiving-method__logo">
                            <i className="fas fa-wallet" />
                        </div>
                        <div className="withdraw-receiving-method__content">
                            <div className="title">Ví Smartcard</div>
                            <div className="description">
                                <div>
                                    Số dư ví chính:{" "}
                                    {formatMoney(
                                        mainWallet ? mainWallet.amount : 0
                                    )}
                                </div>
                                <div>
                                    Số dư ví phụ:{" "}
                                    {formatMoney(
                                        secondaryWallet
                                            ? secondaryWallet.amount
                                            : 0
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
