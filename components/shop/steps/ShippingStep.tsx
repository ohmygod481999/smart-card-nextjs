import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Shipping, ShippingOption } from "../../../types/global";

interface Props {
    onNext: () => void;
    setShipping: (shipping: Shipping) => void;
}

function ShippingStep({ onNext, setShipping }: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [shippingOption, setShippingOption] = useState<ShippingOption>(
        ShippingOption.SELF_GET
    );

    const submit = (values: any) => {
        setShipping({
            shippingOption,
            payload: shippingOption === ShippingOption.SHIP ? values : {},
        });
        onNext();
    };

    return (
        <div className="section-checkout">
            <div>
                <div className="section-checkout__step-page">
                    <div className="form-check">
                        <input
                            onChange={(e) =>
                                setShippingOption(parseInt(e.target.value))
                            }
                            checked={shippingOption === ShippingOption.SELF_GET}
                            className="form-check-input"
                            value={ShippingOption.SELF_GET}
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                        >
                            Nhận hàng tại công ty
                        </label>
                    </div>
                    <div
                        className="form-check"
                        style={{
                            marginBottom: 20,
                        }}
                    >
                        <input
                            onChange={(e) =>
                                setShippingOption(parseInt(e.target.value))
                            }
                            checked={shippingOption === ShippingOption.SHIP}
                            className="form-check-input"
                            value={ShippingOption.SHIP}
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                        >
                            Giao hàng tại nhà
                        </label>
                    </div>
                    {shippingOption === ShippingOption.SHIP && (
                        <div className="register-form row">
                            <div className="form-group mb-3">
                                <label>Tên người nhận</label>
                                <input
                                    {...register("name", {
                                        required: {
                                            message: "Trường bắt buộc",
                                            value: true,
                                        },
                                    })}
                                    autoComplete="off"
                                    className="form-control"
                                    placeholder="Nhập tên"
                                />
                                {errors && errors["name"] && (
                                    <div className="invalid-feedback d-block">
                                        {String(errors["name"].message)}
                                    </div>
                                )}
                            </div>
                            <div className="form-group mb-3">
                                <label>Số điện thoại</label>
                                <input
                                    {...register("phone", {
                                        required: {
                                            message: "Trường bắt buộc",
                                            value: true,
                                        },
                                    })}
                                    autoComplete="off"
                                    className="form-control"
                                    placeholder="VD: 0829400301"
                                />
                                {errors && errors["phone"] && (
                                    <div className="invalid-feedback d-block">
                                        {String(errors["phone"].message)}
                                    </div>
                                )}
                            </div>
                            <div className="form-group mb-3">
                                <label>Địa chỉ</label>
                                <input
                                    {...register("address", {
                                        required: {
                                            message: "Trường bắt buộc",
                                            value: true,
                                        },
                                    })}
                                    autoComplete="off"
                                    className="form-control"
                                    placeholder="Địa chỉ chi tiết"
                                />
                                {errors && errors["address"] && (
                                    <div className="invalid-feedback d-block">
                                        {String(errors["address"].message)}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button className="full-width-btn" onClick={handleSubmit(submit)}>
                Tiếp tục
            </button>
        </div>
    );
}

export default ShippingStep;
