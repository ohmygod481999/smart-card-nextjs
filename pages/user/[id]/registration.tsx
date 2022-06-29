import {
    SelfServiceRegistrationFlow,
    SubmitSelfServiceRegistrationFlowBody,
} from "@ory/client";
import { CardTitle } from "@ory/themes";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import SessionContext from "../../../context/session-context";
import { ActionCard, CenterLink, Flow, MarginCard, ory } from "../../../pkg";
import { handleFlowError } from "../../../pkg/errors";

const Login: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { updateSession } = useContext(SessionContext);

    // The "flow" represents a registration process and contains
    // information about the form we need to render (e.g. username + password)
    const [flow, setFlow] = useState<SelfServiceRegistrationFlow>();

    // Get ?flow=... from the URL
    const { flow: flowId, return_to: returnTo } = router.query;

    // In this effect we either initiate a new registration flow, or we fetch an existing registration flow.
    useEffect(() => {
        // If the router is not ready yet, or we already have a flow, do nothing.
        if (!router.isReady || flow) {
            return;
        }

        // If ?flow=.. was in the URL, we fetch it
        if (flowId) {
            ory.getSelfServiceRegistrationFlow(String(flowId))
                .then(({ data }) => {
                    // We received the flow - let's use its data and render the form!
                    setFlow(data);
                })
                .catch(handleFlowError(router, "registration", setFlow));
            return;
        }

        // Otherwise we initialize it
        ory.initializeSelfServiceRegistrationFlowForBrowsers(
            returnTo ? String(returnTo) : undefined
        )
            .then(({ data }) => {
                console.log(data);
                setFlow(data);
            })
            .catch(handleFlowError(router, "registration", setFlow));
    }, [flowId, router, router.isReady, returnTo, flow]);

    const onSubmit = (values: SubmitSelfServiceRegistrationFlowBody) => {
        const newValues = {
            ...values,
            "traits.card_id": id,
        };

        return (
            router
                // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
                // his data when she/he reloads the page.
                .push(`/user/${id}/registration?flow=${flow?.id}`, undefined, {
                    shallow: true,
                })
                .then(() =>
                    ory
                        .submitSelfServiceRegistrationFlow(
                            String(flow?.id),
                            newValues
                        )
                        .then(({ data }) => {
                            // If we ended up here, it means we are successfully signed up!
                            //
                            // You can do cool stuff here, like having access to the identity which just signed up:
                            console.log(
                                "This is the user session: ",
                                data,
                                data.identity
                            );
                            updateSession();

                            // For now however we just want to redirect home!
                            return router
                                .push(flow?.return_to || `/login?login_success=true`)
                                .then(() => {});
                        })
                        .catch(handleFlowError(router, "registration", setFlow))
                        .catch((err: any) => {
                            // If the previous handler did not catch the error it's most likely a form validation error
                            if (err.response?.status === 400) {
                                // Yup, it is!
                                setFlow(err.response?.data);
                                return;
                            }

                            return Promise.reject(err);
                        })
                )
        );
    };

    return (
        <Layout id={id} haveNav={false}>
            <section id="blog" className="section active">
                <div className="homecolor-box" />
                <div className="common_bg animate__animated animate__fadeInDown">
                    <div className="container">
                        {/* Blog-Section Title */}
                        <div className="blog-section text-center">
                            <div className="row ">
                                <div className="col-12">
                                    <div className="section-title animate__animated animate__bounceInDown animate__delay-1s">
                                        <h1 className="common-title">
                                            Đăng ký
                                        </h1>
                                        <div className="animated-bar" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Blog-Section Title End */}
                        {/* Blog-Content Box Start */}
                        <div className="blog-section animate__animated animate__fadeInUp animate__delay-2s">
                            <div className="row justify-content-center">
                                <MarginCard>
                                    <CardTitle>Create account</CardTitle>
                                    <Flow onSubmit={onSubmit} flow={flow} />
                                </MarginCard>
                                <ActionCard>
                                    <CenterLink
                                        data-testid="cta-link"
                                        href={`/${id}/login`}
                                    >
                                        Sign in
                                    </CenterLink>
                                </ActionCard>
                            </div>
                        </div>
                        {/* Blog-Content Box End */}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Login;
