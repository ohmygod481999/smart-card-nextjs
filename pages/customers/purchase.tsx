import { useQuery } from "@apollo/client";
import Head from "next/head";
import React, { useCallback, useMemo, useState } from "react";
import LayoutAuthed from "../../components/LayoutAuthed";
import SectionLayout from "../../components/SectionLayout";
import ProductItem from "../../components/shop/ProductItem";
import QuantityBtns from "../../components/shop/QuantityBtns";
import { CartItem, Product } from "../../types/global";
import { formatMoney, getDataGraphqlResult } from "../../utils";
import { GET_PRODUCTS } from "../../utils/apollo/queries/product.queries";

function Purchase() {
    const { data, loading, error } = useQuery(GET_PRODUCTS);

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
            alert(JSON.stringify(cartItems));
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
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default Purchase;
