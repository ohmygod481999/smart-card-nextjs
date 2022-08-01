import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import LayoutAuthed from "../../../components/LayoutAuthed";
import SectionLayout from "../../../components/SectionLayout";
import PaymentStep from "../../../components/shop/steps/PaymentStep";
import ReviewStep from "../../../components/shop/steps/ReviewStep";
import ShippingStep from "../../../components/shop/steps/ShippingStep";
import {
    CartItem,
    Order,
    PaymentMethod,
    Shipping,
} from "../../../types/global";

enum CheckoutStep {
    SHIPPING = 0,
    PAYMENT = 1,
    REVIEW = 2,
    SUCCESS = 3,
}

function Checkout() {
    const router = useRouter();
    const [order, setOrder] = useState<Order>({
        shipping: null,
        paymentMethod: null,
    });

    const [currentStep, setCurrentStep] = useState<CheckoutStep>(
        CheckoutStep.SHIPPING
    );

    const setShipping = useCallback(
        (shipping: Shipping) => {
            setOrder({
                ...order,
                shipping,
            });
        },
        [order]
    );

    const setPaymentMethod = useCallback(
        (paymentMethod: PaymentMethod) => {
            setOrder({
                ...order,
                paymentMethod,
            });
        },
        [order]
    );

    useEffect(() => {
        const cartItemsJSON = localStorage.getItem("cart");
        const cartItems: CartItem[] | null = cartItemsJSON
            ? JSON.parse(cartItemsJSON)
            : null;
        if (!cartItems || (cartItems && cartItems.length === 0)) {
            alert("Vui lòng chọn sản phẩm để thanh toán");
            router.push("/customers/shop");
        }
    }, []);

    const onNext = useCallback(() => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            alert("Đặt hàng");
            setCurrentStep(currentStep + 1);
        }
    }, [currentStep]);

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Checkout</title>
            </Head>
            <SectionLayout>
                <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                    <h1 className="left-title">
                        Thanh <span>toán</span>
                    </h1>
                    <div className="animated-bar left" />
                </div>
                <div className="section-checkout__steps">
                    <div
                        className={`section-checkout__step ${
                            currentStep > 0 ? "done" : ""
                        }`}
                    >
                        <span>1.</span> Giao hàng
                    </div>
                    <div
                        className={`section-checkout__step ${
                            currentStep > 1 ? "done" : ""
                        }`}
                    >
                        <span>2.</span> Thanh toán
                    </div>
                    <div
                        className={`section-checkout__step ${
                            currentStep > 2 ? "done" : ""
                        }`}
                    >
                        <span>3.</span> Đặt hàng
                    </div>
                </div>
                {currentStep === CheckoutStep.SHIPPING && (
                    <ShippingStep onNext={onNext} setShipping={setShipping} />
                )}
                {currentStep === CheckoutStep.PAYMENT && (
                    <PaymentStep
                        onNext={onNext}
                        paymentMethod={order.paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                )}
                {currentStep === CheckoutStep.REVIEW && (
                    <ReviewStep order={order} onNext={onNext} />
                )}
                {currentStep === CheckoutStep.SUCCESS && (
                    <div className="text-center">
                        <Image
                            src={"/icon/success.png"}
                            width={200}
                            height={200}
                        />
                        <h5>Đặt hàng thành công</h5>
                        <div>
                            Về <Link href={"/"}>trang chủ</Link>
                        </div>
                    </div>
                )}
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default Checkout;
