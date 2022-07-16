import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

import { Identity } from "@ory/client";

import SessionContext from "../context/session-context";
import LayoutAuthed from "../components/LayoutAuthed";
import { GET_CARD_BY_ORY_ID } from "../utils/apollo/queries/card.queries";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Account } from "../types/global";
import { getDataGraphqlResult, paddingId } from "../utils";
import { get } from "lodash";
import AccountCard from "../components/AccountCard";
import { GET_REFEREES } from "../utils/apollo/queries/account.queries";
import Row, { RefereeRecord } from "../components/TableHaveChildren/Row";
import Head from "next/head";

const Home: NextPage = () => {
    const router = useRouter();

    const { session, updateSession } = useContext(SessionContext);
    const [referees, setReferees] = useState<RefereeRecord[] | null>(null);

    const [getReferees, { called, loading, data }] = useLazyQuery(GET_REFEREES);

    useEffect(() => {
        if (session) {
            getReferees({
                variables: {
                    ory_id: session.identity.id,
                },
            });
        } else if (session === null) {
            router.push("/login");
        }
    }, [session]);

    useEffect(() => {
        if (data) {
            const referees = getDataGraphqlResult(data);
            setReferees(
                referees.map((referee: any) => {
                    if (referee.ory_id === session.identity.id) {
                        return {
                            ...referee,
                            name: `${referee.name} (Tôi)`,
                        };
                    }
                    return referee;
                })
            );
            // if (cards && cards.length > 0) {
            //     setAccount(cards[0].account);
            // }
        }
    }, [data]);

    console.log(referees);

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Danh sách đại lý</title>
            </Head>
            <section id="contact" className="section active">
                <div className="homecolor-box" />
                <div className="common_bg animate__animated animate__zoomIn">
                    <div className="container">
                        {/* Contact-page Start */}
                        <div className="contact-section">
                            {/* Contact-Section Title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                                        <h1 className="left-title">
                                            Danh sách <span>đại lý</span>
                                        </h1>
                                        <div className="animated-bar left" />
                                    </div>
                                </div>
                            </div>
                            {/* Contact-Section Title End*/}
                            {/* Contact Form Start */}
                            <div className="contact-section">
                                <div className="row">
                                    {/* Contact form */}
                                    <div
                                        className="col-lg-12 col-12"
                                        style={{
                                            marginBottom: 20,
                                        }}
                                    >
                                        Mã giới thiệu:{" "}
                                        <span className="referer-code">
                                            {referees?.length
                                                ? paddingId(referees[0].id)
                                                : "N/A"}
                                        </span>
                                    </div>
                                    <div className="col-lg-12 col-12 table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    {/* <th scope="col">#</th> */}
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">
                                                        Ngày tham gia
                                                    </th>
                                                    <th scope="col">
                                                        Là đại lý
                                                    </th>
                                                    <th scope="col">
                                                        Lượt giới thiệu
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {referees &&
                                                    referees.map((referee) => (
                                                        <Row
                                                            key={referee.id}
                                                            level={0}
                                                            referee={referee}
                                                            moreExpand={
                                                                referee.is_agency
                                                            }
                                                            // name={referee.name}
                                                            // refereeChildren={referee.referees}
                                                        />
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Contact-page End */}
                    </div>
                </div>
            </section>
        </LayoutAuthed>
    );
};

export default Home;
