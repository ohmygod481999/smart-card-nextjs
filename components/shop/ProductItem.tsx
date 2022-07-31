import React, { useMemo } from "react";
import { CartItem, Product } from "../../types/global";
import { formatMoney } from "../../utils";
import QuantityBtns from "./QuantityBtns";

interface Props {
    product: Product;
    cartItems: CartItem[];
    changeQuantityProduct: (product: Product, quantity: number) => void;
}

function ProductItem(props: Props) {
    const { product, cartItems, changeQuantityProduct } = props;

    const quantity = useMemo(() => {
        let q = 0;
        cartItems.forEach((item) => {
            if (item.product.id === product.id) {
                q = item.quantity;
            }
        });
        return q;
    }, [product, cartItems]);

    return (
        <div className="section-products-item">
            <div className="section-products-item__thumbnail">
                <img src={product.thumbnail} />
            </div>
            <div className="section-products-item__content">
                <div>
                    <div className="section-products-item__title">
                        {product.name}
                    </div>
                    <div className="section-products-item__description">
                        {product.description}
                    </div>
                </div>
                <div className="section-products-item__bottom">
                    <div className="section-products-item__bottom-price">
                        {formatMoney(product.price)}
                    </div>
                    <QuantityBtns
                        quantity={quantity}
                        changeQuantityProduct={(quantity: number) => {
                            changeQuantityProduct(product, quantity);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
