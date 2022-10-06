import { useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import LayoutAuthed from "../../../components/LayoutAuthed";
import SectionLayout from "../../../components/SectionLayout";
import SessionContext from "../../../context/session-context";
import { BANK_ACCOUNT, getDataGraphqlResult } from "../../../utils";
import { GET_REGISTRATION_BY_ID } from "../../../utils/apollo/queries/registration.queries";

function RechargeSuccess() {
    const router = useRouter();
    const { session } = useContext(SessionContext);

    const { id } = router.query;

    const { data, loading, error } = useQuery(GET_REGISTRATION_BY_ID, {
        variables: {
            registration_id: id,
        },
    });

    const registration = useMemo(() => {
        if (data && !loading) {
            return getDataGraphqlResult(data);
        }
        return data;
    }, [data, loading, error]);

    console.log(registration);

    if (!loading && (registration === null || !id || registration?.approved)) {
        return (
            <LayoutAuthed>
                <Head>
                    <title>Smartcardnp - Trang không khả dụng</title>
                </Head>
                <SectionLayout>
                    <h3 className="text-center">Trang không khả dụng</h3>
                </SectionLayout>
            </LayoutAuthed>
        );
    }

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Tạo lệnh nạp thành công</title>
            </Head>
            <SectionLayout>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                            <h1 className="left-title">Lệnh nạp thành công</h1>
                            <div className="animated-bar left" />
                        </div>
                        <div>
                            <p
                                className="text-center"
                                style={{
                                    fontSize: 17,
                                    marginTop: 20,
                                }}
                            >
                                Bạn đã tạo lệnh nạp thành công, vui lòng chuyển
                                khoản cho chúng tôi, chúng tôi sẽ chuyển tiền
                                vào tài khoản bạn trong 24 giờ tới
                            </p>
                            <table className="table">
                                    <caption className="text-center">
                                        Thông tin chuyển khoản
                                    </caption>
                                    <thead>
                                        <tr>
                                            <td>Ngân hàng</td>
                                            <td>Số tài khoản</td>
                                            <td>Chủ tài khoản</td>
                                            <td>Nội dung chuyển khoản</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">{BANK_ACCOUNT.BANK_NAME}</th>
                                            <td>{BANK_ACCOUNT.BANK_NUMBER}</td>
                                            <td>{BANK_ACCOUNT.BANK_ACCOUNT_NAME}</td>
                                            <td>NAPTIEN {session?.user.id} {id}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            <p
                                className="text-center"
                                style={{
                                    fontSize: 17,
                                }}
                            >
                                Mã lệnh:{" "}
                                <span className="referer-code">#{id}</span>
                            </p>
                            <p
                                className="text-center"
                                style={{
                                    fontSize: 17,
                                }}
                            >
                                <Link href={"/home"}>Về trang chủ</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </LayoutAuthed>
    );
}

export default RechargeSuccess;