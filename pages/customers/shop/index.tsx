import { useQuery } from "@apollo/client";
import Head from "next/head";
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
import ProductItem from "../../../components/shop/ProductItem";
import QuantityBtns from "../../../components/shop/QuantityBtns";
import SessionContext from "../../../context/session-context";
import { CartItem, OrderStatus, Product } from "../../../types/global";
import { formatMoney, getDataGraphqlResult } from "../../../utils";
import { apolloClient } from "../../../utils/apollo";
import { GET_ORDER_BY_ACCOUNT_ID } from "../../../utils/apollo/queries/order.queries";
import { GET_PRODUCTS } from "../../../utils/apollo/queries/product.queries";

function Shop() {
    const router = useRouter();
    const { data, loading, error } = useQuery(GET_PRODUCTS);
    const { session, updateSession } = useContext(SessionContext);
    const [oldOrders, setOldOrders] = useState<any[] | null>(null);

    useEffect(() => {
        if (session) {
            apolloClient
                .query({
                    query: GET_ORDER_BY_ACCOUNT_ID,
                    variables: {
                        account_id: session.user.id,
                        status: OrderStatus.CREATED,
                    },
                    fetchPolicy: "network-only",
                })
                .then((res) => {
                    const _orders = getDataGraphqlResult(res.data);
                    setOldOrders(_orders);
                });
        } else if (session === null) {
            router.push("/login");
        }
    }, [session]);

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const products: null | Product[] = useMemo(() => {
        if (!data) return null;
        return getDataGraphqlResult(data);
    }, [data]);

    const totalPrice = useMemo(() => {
        return cartItems.reduce((prev, cur) => {
            return prev + cur.quantity * cur.product.price;
        }, 0);
    }, [cartItems]);

    const changeQuantityProduct = useCallback(
        (product: Product, quantity: number) => {
            if (cartItems.map((item) => item.product.id).includes(product.id)) {
                if (quantity !== 0) {
                    setCartItems(
                        cartItems.map((item) => {
                            if (item.product.id === product.id) {
                                return {
                                    ...item,
                                    quantity,
                                };
                            }
                            return item;
                        })
                    );
                } else {
                    setCartItems(
                        cartItems.filter((item) => {
                            if (item.product.id !== product.id) {
                                return true;
                            }
                            return false;
                        })
                    );
                }
            } else {
                setCartItems([
                    ...cartItems,
                    {
                        product,
                        quantity,
                    },
                ]);
            }
        },
        [cartItems]
    );

    const onOrder = useCallback(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
            router.push("/customers/shop/checkout");
        } else {
            alert("Vui lòng chọn sản phẩm");
        }
    }, [cartItems]);

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Nhập hàng</title>
            </Head>
            <SectionLayout>
                <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                    <h1 className="left-title">
                        Nhập <span>hàng</span>
                    </h1>
                    <div className="animated-bar left" />
                </div>
                {oldOrders && oldOrders.length > 0 && (
                    <div>
                        Bạn có đơn hàng đang xử lý, vui lòng đợi chúng tôi xác
                        nhận trước khi có yêu cầu đặt hàng tiếp theo
                    </div>
                )}
                {oldOrders && oldOrders.length === 0 && (
                    <div className="shop-container">
                        <div className="section-products">
                            {products &&
                                products.map((product) => (
                                    <ProductItem
                                        key={product.id}
                                        product={product}
                                        cartItems={cartItems}
                                        changeQuantityProduct={
                                            changeQuantityProduct
                                        }
                                    />
                                ))}
                        </div>
                        <div className="section-cart">
                            <div className="section-cart__items">
                                <div className="section-cart__item">
                                    <div className="section-cart__item-title">
                                        Tổng tiền
                                    </div>
                                    <div className="section-cart__item-right">
                                        <div className="section-cart__item-price">
                                            {formatMoney(totalPrice)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="full-width-btn btn-white"
                                onClick={onOrder}
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                )}
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default Shop;
