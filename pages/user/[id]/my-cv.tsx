import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { Account, ActiveRoute, CardInfo } from "../../../types/global";
import { getValueFromGraphql } from "../../../utils";
import { apolloClient } from "../../../utils/apollo";
import { GET_CARD } from "../../../utils/apollo/queries/card.queries";
import Viewer, { Worker } from "@phuocng/react-pdf-viewer";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";
import { useMemo } from "react";

interface Props {
    cardInfo: CardInfo;
    accountInfo: Account;
}

const Contact = ({ cardInfo, accountInfo }: Props) => {
    const router = useRouter();
    const { id } = router.query;

    console.log(accountInfo);

    const activeRoutes = useMemo(() => {
        if (accountInfo.user_cv) {
            return [ActiveRoute.USER_CV];
        }
    }, [accountInfo]);

    return (
        <Layout id={id} activeRoutes={activeRoutes}>
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
                                        <p className="common-desctiption">
                                            Feel free to contact me anytimes
                                        </p>
                                        <h1 className="common-title">
                                            CV <span>của tôi</span>
                                        </h1>
                                        <div className="animated-bar" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    {accountInfo.user_cv && (
                                        // @ts-ignore
                                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                                            <div
                                                style={{
                                                    height: "500px",
                                                    width: "100%",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                <Viewer
                                                    fileUrl={
                                                        accountInfo.user_cv.path
                                                    }
                                                />
                                            </div>
                                        </Worker>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Contact-page End */}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cardResultData = await apolloClient.query({
        query: GET_CARD,
        variables: {
            id: context.query.id,
        },
        fetchPolicy: "no-cache",
    });
    const cardInfo: CardInfo | null = getValueFromGraphql(cardResultData.data);

    let accountInfo = cardInfo?.account || null;

    return {
        props: {
            cardInfo: cardInfo,
            accountInfo: accountInfo,
        }, // will be passed to the page component as props
    };
};

export default Contact;
