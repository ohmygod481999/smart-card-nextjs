import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import LayoutAuthed from "../../../components/LayoutAuthed";
import SectionLayout from "../../../components/SectionLayout";
import PaymentStep from "../../../components/shop/steps/PaymentStep";
import ReviewStep from "../../../components/shop/steps/ReviewStep";
import ShippingStep from "../../../components/shop/steps/ShippingStep";
import SessionContext from "../../../context/session-context";
import {
    CartItem,
    OrderState,
    OrderItem,
    OrderStatus,
    PaymentMethod,
    Shipping,
} from "../../../types/global";
import { apolloClient } from "../../../utils/apollo";
import { ADD_ORDER } from "../../../utils/apollo/mutations/order.mutation";
import _ from "lodash";
import axios from "axios";

enum CheckoutStep {
    SHIPPING = 0,
    PAYMENT = 1,
    REVIEW = 2,
    SUCCESS = 3,
}

function Checkout() {
    const { session, updateSession } = useContext(SessionContext);

    const router = useRouter();
    const [order, setOrder] = useState<OrderState>({
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

    const cartItems: CartItem[] | null = useMemo(() => {
        if (typeof window !== "undefined") {
            const cartItemsJson = localStorage.getItem("cart");
            return cartItemsJson ? JSON.parse(cartItemsJson) : null;
        }
        return null;
    }, []);

    const onNext = useCallback(async () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            // Place order
            if (order.shipping && order.paymentMethod !== null && cartItems && session) {
                const orderItems: OrderItem[] = cartItems.map((item) => ({
                    product_id: item.product.id,
                    quantity: item.quantity,
                    product: item.product,
                }));

                try {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/order/create`,
                        {
                            agency_id: session.user.id,
                            customer_phone: order.shipping.payload.phone
                                ? order.shipping.payload.phone
                                : "N/A",
                            customer_name: order.shipping.payload.name
                                ? order.shipping.payload.name
                                : "N/A",
                            customer_address: order.shipping.payload.address
                                ? order.shipping.payload.address
                                : "N/A",
                            // status: OrderStatus.CREATED,
                            shipping_type: order.shipping.shippingOption,
                            payment_type: order.paymentMethod,
                            order_items: orderItems.map((item) => ({
                                product_id: item.product_id,
                                quantity: item.quantity,
                            })),
                        }
                    );
                    // const res = await apolloClient.mutate({
                    //     mutation: ADD_ORDER,
                    //     variables: {
                    //         account_id: session.user.id,
                    //         customer_phone: order.shipping.payload.phone
                    //             ? order.shipping.payload.phone
                    //             : "N/A",
                    //         customer_name: order.shipping.payload.name
                    //             ? order.shipping.payload.name
                    //             : "N/A",
                    //         customer_address: order.shipping.payload.address
                    //             ? order.shipping.payload.address
                    //             : "N/A",
                    //         status: OrderStatus.CREATED,
                    //         shipping_type: order.shipping.shippingOption,
                    //         payment_type: order.paymentMethod,
                    //         order_items: {
                    //             data: orderItems.map(item => ({
                    //                 product_id: item.product_id,
                    //                 quantity: item.quantity
                    //             })),
                    //         },
                    //     },
                    // });

                    if (res.data && _.get(res, "data.success")) {
                        // success
                        setCurrentStep(currentStep + 1);
                    } else {
                        throw new Error("Some thing wrong happend");
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.log(
                    "missing information",
                    order.shipping,
                    order.paymentMethod
                );
            }
        }
    }, [currentStep, order, session]);

    const totalPrice = useMemo(() => {
        if (cartItems) {
            return cartItems.reduce((prev, cur) => {
                return prev + cur.quantity * cur.product.price;
            }, 0);
        }
        return 0;
    }, [cartItems]);

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Checkout</title>
            </Head>
            <SectionLayout>
                <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                    <h1 className="left-title">
                        <button className="back-btn">
                            <Link href={"/customers/shop"}>
                                <Image
                                    src="/icon/back.png"
                                    width={22}
                                    height={22}
                                />
                            </Link>
                        </button>{" "}
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
                        totalPrice={totalPrice}
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
                            Về <Link href={"/home"}>trang chủ</Link>
                        </div>
                    </div>
                )}
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default Checkout;
