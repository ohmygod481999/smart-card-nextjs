import {
    SelfServiceRecoveryFlow,
    SubmitSelfServiceRecoveryFlowBody,
} from "@ory/client";
import { CardTitle } from "@ory/themes";
import { AxiosError } from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LayoutAuthed from "../components/LayoutAuthed";
import SectionLayout from "../components/SectionLayout";

import { Flow, ActionCard, CenterLink, MarginCard } from "../pkg";
import { handleFlowError } from "../pkg/errors";
import ory from "../pkg/sdk";
import _ from "lodash";
import Layout from "../components/Layout";

const Recovery: NextPage = () => {
    const [flow, setFlow] = useState<SelfServiceRecoveryFlow>();

    // Get ?flow=... from the URL
    const router = useRouter();
    const { flow: flowId, return_to: returnTo, token } = router.query;

    useEffect(() => {
        // If the router is not ready yet, or we already have a flow, do nothing.
        if (!router.isReady || flow) {
            return;
        }

        // If ?flow=.. was in the URL, we fetch it
        if (flowId) {
            ory.getSelfServiceRecoveryFlow(String(flowId))
                .then(({ data }) => {
                    setFlow(data);
                })
                // .catch(handleFlowError(router, "recovery", setFlow));
            return;
        }

        // Otherwise we initialize it
        ory.initializeSelfServiceRecoveryFlowForBrowsers()
            .then(({ data }) => {
                setFlow(data);
            })
            .catch(handleFlowError(router, "recovery", setFlow))
            .catch((err: AxiosError) => {
                // If the previous handler did not catch the error it's most likely a form validation error
                if (err.response?.status === 400) {
                    // Yup, it is!
                    setFlow(_.get(err, "response.data"));
                    return;
                }

                return Promise.reject(err);
            });
    }, [flowId, router, router.isReady, returnTo, flow]);

    const onSubmit = (values: SubmitSelfServiceRecoveryFlowBody) =>
        router
            // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
            // his data when she/he reloads the page.
            .push(`/recovery?flow=${flow?.id}`, undefined, { shallow: true })
            .then(() =>
                ory
                    .submitSelfServiceRecoveryFlow(String(flow?.id), values)
                    .then(({ data }) => {
                        // Form submission was successful, show the message to the user!
                        setFlow(data);
                    })
                    .catch(handleFlowError(router, "recovery", setFlow))
                    .catch((err: AxiosError) => {
                        switch (err.response?.status) {
                            case 400:
                                // Status code 400 implies the form validation had an error
                                setFlow(_.get(err, "response.data"));
                                return;
                        }

                        throw err;
                    })
            );

    return (
        <Layout>
            <SectionLayout>
                <div className="row">
                    <div className="col-12">
                        <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                            <h1 className="left-title">
                                Khôi phục <span>tài khoản</span>
                            </h1>
                            <div className="animated-bar left" />
                        </div>
                        <div className="blog-section animate__animated animate__fadeInUp animate__delay-2s">
                            <div className="row justify-content-center">
                                <Flow onSubmit={onSubmit} flow={flow} />
                            </div>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </Layout>
    );
};

export default Recovery;
