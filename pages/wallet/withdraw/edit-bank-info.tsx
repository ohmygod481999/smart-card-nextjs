import { useLazyQuery } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import LayoutAuthed from "../../../components/LayoutAuthed";
import SectionLayout from "../../../components/SectionLayout";
import SessionContext from "../../../context/session-context";
import { Wallet, WalletType } from "../../../types/global";
import { getDataGraphqlResult, getWallet } from "../../../utils";
import { apolloClient } from "../../../utils/apollo";
import {
    GET_WALLETS,
    UPDATE_BANK_ACCOUNT,
} from "../../../utils/apollo/queries/wallet.queries";

function EditBankInfo() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const { session, updateSession } = useContext(SessionContext);

    const [wallets, setWallets] = useState<Wallet[] | null>(null);
    const [getWallets, { called, loading, data }] = useLazyQuery(GET_WALLETS);

    const [submitLoading, setSubmitLoading] = useState(false);
    const [msg, setMsg] = useState("");

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

    const onSubmitEditBank = async (values: any) => {
        const { bank_name, bank_number } = values;
        console.log(values);
        if (mainWallet) {
            setSubmitLoading(true);
            try {
                const updateRes = await apolloClient.mutate({
                    mutation: UPDATE_BANK_ACCOUNT,
                    variables: {
                        wallet_id: mainWallet.id,
                        bank_name,
                        bank_number,
                    },
                });
                setMsg("Thành công");
                // Router.reload();
            } catch (err) {
                console.error(err);
            }
            setSubmitLoading(false);
        }
    };

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Rút tiền</title>
            </Head>
            <SectionLayout>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                            <h1 className="left-title">
                                <button className="back-btn">
                                    <Link href={"/wallet/withdraw"}>
                                        <Image
                                            src="/icon/back.png"
                                            width={22}
                                            height={22}
                                        />
                                    </Link>
                                </button>{" "}
                                Sửa thông tin thẻ
                            </h1>
                            <div className="animated-bar left" />
                            <div className="mt-3">
                                <div className="row justify-content-center">
                                    <form
                                        className="register-form row"
                                        onSubmit={handleSubmit(
                                            onSubmitEditBank
                                        )}
                                        autoComplete="off"
                                    >
                                        <div className="form-group mb-3">
                                            <label>Mã thẻ</label>
                                            <input
                                                {...register("bank_name")}
                                                autoComplete="off"
                                                className="form-control"
                                                placeholder="Tên ngân hàng"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Số tài khoản</label>
                                            <input
                                                {...register("bank_number")}
                                                autoComplete="off"
                                                className="form-control"
                                                placeholder="Số tài khoản"
                                            />
                                        </div>
                                        {msg && <div>{msg}</div>}
                                        <div className="form-submit">
                                            <button className="clickbtn">
                                                Lưu
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default EditBankInfo;
