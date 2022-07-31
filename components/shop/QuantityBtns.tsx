import React, { useCallback, useState } from "react";

interface Props {
    quantity: number;
    changeQuantityProduct: Function;
}

function QuantityBtns(props: Props) {
    const { quantity, changeQuantityProduct } = props;
    // const [quantity, setQuantity] = useState(0);

    const down = useCallback(() => {
        if (quantity > 0) {
            changeQuantityProduct(quantity - 1);
        }
    }, [quantity]);

    const up = useCallback(() => {
        changeQuantityProduct(quantity + 1);
    }, [quantity]);

    return (
        <div className="section-products-item__bottom-quantity">
            <button className="quantity-btn" onClick={down}>
                -
            </button>
            <span>{quantity}</span>
            <button className="quantity-btn" onClick={up}>
                +
            </button>
        </div>
    );
}

export default QuantityBtns;
