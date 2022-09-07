import { useQuery } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import LayoutAuthed from "../../../components/LayoutAuthed";
import SectionLayout from "../../../components/SectionLayout";
import SessionContext from "../../../context/session-context";
import { Order, Transaction, TransactionTypeEnum } from "../../../types/global";
import {
    formatDateTime,
    formatMoney,
    getTransactionName,
} from "../../../utils";
import { apolloClient } from "../../../utils/apollo";
import { GET_ORDER_BY_ID } from "../../../utils/apollo/queries/order.queries";
import { GET_DETAIL_TRANSATION } from "../../../utils/apollo/queries/transaction.queries";

function DetailTransaction() {
    const { session, updateSession } = useContext(SessionContext);

    const user = session?.user;

    const router = useRouter();
    const { id } = router.query;

    const { data, loading, error } = useQuery<{
        transaction_by_pk: Transaction;
    }>(GET_DETAIL_TRANSATION, {
        variables: {
            id,
        },
    });

    const transaction: Transaction | null = useMemo(() => {
        if (data) {
            return data?.transaction_by_pk;
        }
        return null;
    }, [data]);

    console.log(transaction);

    const transactionName = getTransactionName(transaction, session?.user.id);

    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (transaction?.order_id) {
            apolloClient
                .query({
                    query: GET_ORDER_BY_ID,
                    variables: {
                        id: transaction.order_id,
                    },
                })
                .then(({ data }) => {
                    if (data) {
                        setOrder(data.order_by_pk);
                    }
                });
        }
    }, [transaction]);

    const attributes: { label: string; value: any }[] = useMemo(() => {
        if (!transaction) return [];
        if (
            transaction.type === TransactionTypeEnum.REWARD_REFER_AGENCY ||
            transaction.type === TransactionTypeEnum.REWARD_REFER
        ) {
            return [
                {
                    label: "Tầng giới thiệu",
                    value: transaction.referral?.level,
                },
                {
                    label: "Người giới thiệu",
                    value: transaction.referral?.accountByRefererId.email,
                },
                {
                    label: "Là đại lý",
                    value: transaction.referral?.accountByRefererId.agency
                        ? "Có"
                        : "Không",
                },
                {
                    label: "Giới thiệu cho",
                    value: transaction.referral?.account.email,
                },
                {
                    label: "Là đại lý",
                    value: transaction.referral?.account.agency
                        ? "Có"
                        : "Không",
                },
            ];
        }
        if (transaction.type === TransactionTypeEnum.PAYMENT) {
            const result: any[] = [
                {
                    label: "Mã đơn hàng",
                    value: transaction.order_id,
                },
                {
                    label: "Đơn vị",
                    value: transaction.vendor?.name,
                },
            ];

            if (order) {
                result.push({
                    label: "chi tiết",
                    value: order ? (
                        <>
                            {order.order_items.map((item, i) => (
                                <div key={i}>
                                    - {item.product.name} x {item.quantity}
                                </div>
                            ))}
                        </>
                    ) : (
                        ""
                    ),
                });
            }
            return result;
        }
        return [];
    }, [transaction, order]);

    console.log(order);

    const sign = useMemo(() => {
        if (!transaction || !session) return null;
        if (transaction.source_id === session.user.id) {
            return "-";
        }
        return "+";
    }, [transaction, session]);

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Giao dịch {id}</title>
            </Head>
            <SectionLayout>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                            <h1 className="left-title">
                                <button className="back-btn">
                                    <Link href={"/wallet"}>
                                        <Image
                                            src="/icon/back.png"
                                            width={22}
                                            height={22}
                                        />
                                    </Link>
                                </button>{" "}
                                Chi tiết giao dịch
                            </h1>
                            <div className="animated-bar left" />
                        </div>
                        <div className="detail-transaction">
                            <h5 className="detail-transaction__title">
                                {transactionName}
                            </h5>
                            <div className="detail-transaction__amount">
                                {sign ? sign : ""}{" "}
                                {transaction && formatMoney(transaction.amount)}
                            </div>
                            <div className="detail-transaction__id">
                                Mã giao dịch: {id}
                            </div>
                            <div className="detail-transaction__date">
                                Thời gian:{" "}
                                {transaction &&
                                    formatDateTime(transaction?.created_at)}
                            </div>
                        </div>

                        {transaction &&
                            transaction.type !== TransactionTypeEnum.WITHDRAW &&
                            transaction.type !== TransactionTypeEnum.RECHARGE &&
                            transaction.type !==
                                TransactionTypeEnum.TRANSFER && (
                                <div className="title-section mt-5">
                                    <div className="title-section__title">
                                        Thông tin thêm
                                    </div>
                                </div>
                            )}

                        {attributes.length > 0 && (
                            <div className="detail-transaction-more">
                                {attributes.map((attribute, i) => (
                                    <div key={i} className="detail-transaction-more_item">
                                        <div className="detail-transaction-more_label">
                                            {attribute.label}
                                        </div>
                                        <div className="detail-transaction-more_value">
                                            {attribute.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default DetailTransaction;
