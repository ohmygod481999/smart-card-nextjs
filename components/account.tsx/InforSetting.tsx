import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getDataGraphqlResult } from "../../utils";
import { apolloClient } from "../../utils/apollo";
import { UPDATE_ACCOUNT } from "../../utils/apollo/mutations/account.mutation";
import { GET_ACCOUNT } from "../../utils/apollo/queries/account.queries";
import { GET_CARD } from "../../utils/apollo/queries/card.queries";
import { Account } from "../../types/global";

interface Props {
    account: Account;
}

function InforSetting(props: Props) {
    const { account } = props;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    // const [account, setAccount] = useState<Account | null | undefined>(
    //     undefined
    // );
    const [msg, setMsg] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        if (account) {
            if (account) {
                const {
                    name,
                    phone,
                    description,
                    email,
                    facebook,
                    zalo,
                    slide_text,
                    website,
                } = account;
                setValue("name", name);
                setValue("phone", phone);
                setValue("description", description);
                setValue("email", email);
                setValue("facebook", facebook);
                setValue("zalo", zalo);
                setValue("slide_text", slide_text);
                setValue("website", website);
            }
        }
    }, [account]);

    if (account === null)
        return <div className="text-center">Thẻ chưa kích hoạt</div>;

    const onSubmit = async (data: any) => {
        const {
            name,
            phone,
            description,
            email,
            facebook,
            zalo,
            slide_text,
            website,
        } = data;
        if (account) {
            setMsg("");
            setSubmitLoading(true);
            await apolloClient.mutate({
                mutation: UPDATE_ACCOUNT,
                variables: {
                    id: account.id,
                    name,
                    phone,
                    description,
                    email,
                    facebook,
                    zalo,
                    slide_text,
                    website,
                },
            });
            setSubmitLoading(false);
            setMsg("Cập nhật thành công");
        } else {
            setMsg("Chưa load đc account");
        }
    };

    return (
        <div
            style={{
                maxWidth: "680px",
                margin: "auto",
                padding: "20px",
            }}
        >
            <h3>Thông tin cá nhân</h3>
            <div className="row">
                <div className="form-group mb-3">
                    <input
                        {...register("name")}
                        className="form-control"
                        placeholder="Tên..."
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        {...register("phone")}
                        className="form-control"
                        placeholder="Số điện thoại..."
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        {...register("email")}
                        className="form-control"
                        placeholder="Email..."
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        {...register("facebook")}
                        className="form-control"
                        placeholder="Facebook..."
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        {...register("zalo")}
                        className="form-control"
                        placeholder="Số điện thoại Zalo (VD: 082....)"
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        {...register("website")}
                        className="form-control"
                        placeholder="Website của bạn"
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        {...register("slide_text")}
                        className="form-control"
                        placeholder="Chữ chạy (cách nhau bởi dấu ',')..."
                    />
                </div>
                <div className="form-group mb-3">
                    <textarea
                        {...register("description")}
                        className="form-control"
                        placeholder="Giới thiệu bản thân"
                    />
                </div>
                {msg && <div className="form-msg mb-3">{msg}</div>}

                <div className="form-submit">
                    <button
                        onClick={handleSubmit(onSubmit)}
                        className="clickbtn"
                        disabled={submitLoading}
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InforSetting;
