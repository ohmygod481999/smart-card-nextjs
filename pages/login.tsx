import {
    SelfServiceLoginFlow,
    SubmitSelfServiceLoginFlowBody,
} from "@ory/client";
import { CardTitle } from "@ory/themes";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import LayoutAuthed from "../components/LayoutAuthed";
import SessionContext from "../context/session-context";
import {
    ActionCard,
    CenterLink,
    useLogoutHandler,
    Flow,
    MarginCard,
    ory,
} from "../pkg";
import { handleFlowError, handleGetFlowError } from "../pkg/errors";

const Login: NextPage = () => {
    // Get ?flow=... from the URL
    const router = useRouter();
    const { id } = router.query;
    const { updateSession } = useContext(SessionContext);

    const [flow, setFlow] = useState<SelfServiceLoginFlow>();

    const {
        return_to: returnTo,
        flow: flowId,
        login_success,
        // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
        // of a user.
        refresh,
        // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
        // to perform two-factor authentication/verification.
        aal,
    } = router.query;

    // This might be confusing, but we want to show the user an option
    // to sign out if they are performing two-factor authentication!
    const onLogout = useLogoutHandler([aal, refresh]);

    useEffect(() => {
        // If the router is not ready yet, or we already have a flow, do nothing.
        if (!router.isReady || flow) {
            return;
        }

        // If ?flow=.. was in the URL, we fetch it
        if (flowId) {
            ory.getSelfServiceLoginFlow(String(flowId))
                .then(({ data }) => {
                    setFlow(data);
                })
                .catch(handleGetFlowError(router, "login", setFlow));
            return;
        }

        // Otherwise we initialize it
        ory.initializeSelfServiceLoginFlowForBrowsers(
            Boolean(refresh),
            aal ? String(aal) : undefined,
            returnTo ? String(returnTo) : undefined
        )
            .then(({ data }) => {
                setFlow(data);
            })
            .catch(handleFlowError(router, "login", setFlow));
    }, [flowId, router, router.isReady, aal, refresh, returnTo, flow]);

    const onSubmit = (values: SubmitSelfServiceLoginFlowBody) =>
        router
            // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
            // his data when she/he reloads the page.
            .push(`/login?flow=${flow?.id}`, undefined, { shallow: true })
            .then(() => {
                return (
                    ory
                        .submitSelfServiceLoginFlow(String(flow?.id), values)
                        // We logged in successfully! Let's bring the user home.
                        .then((res) => {
                            return updateSession();
                            // if (flow?.return_to) {
                            //     window.location.href = flow?.return_to;
                            //     return;
                            // }
                        })
                        .then(() => {
                            router.push(`/account`);
                        })
                        .catch(handleFlowError(router, "login", setFlow))
                        .catch((err: any) => {
                            // If the previous handler did not catch the error it's most likely a form validation error
                            if (err.response?.status === 400) {
                                // Yup, it is!
                                setFlow(err.response?.data);
                                return;
                            }

                            return Promise.reject(err);
                        })
                );
            });

    return (
        <LayoutAuthed>
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
                                            {(() => {
                                                if (flow?.refresh) {
                                                    return "Confirm Action";
                                                } else if (
                                                    flow?.requested_aal ===
                                                    "aal2"
                                                ) {
                                                    return "Two-Factor Authentication";
                                                }
                                                return "Đăng nhập";
                                            })()}
                                        </h1>
                                        <div className="animated-bar" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Blog-Section Title End */}
                        {/* Blog-Content Box Start */}
                        <div className="blog-section animate__animated animate__fadeInUp animate__delay-2s">
                            <div className="row justify-content-center flex-column">
                                {login_success === "true" && (
                                    <p className="text-center">
                                        Đăng ký thành công, mời đăng nhập
                                    </p>
                                )}
                                <MarginCard>
                                    <Flow onSubmit={onSubmit} flow={flow} />
                                </MarginCard>
                                {aal || refresh ? (
                                    <ActionCard>
                                        <CenterLink
                                            data-testid="logout-link"
                                            onClick={onLogout}
                                        >
                                            Log out
                                        </CenterLink>
                                    </ActionCard>
                                ) : (
                                    <div className="text-center">
                                        <ActionCard>
                                            <Link href="/recovery" passHref>
                                                <CenterLink>
                                                    Khôi phục tài khoản
                                                </CenterLink>
                                            </Link>
                                        </ActionCard>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Blog-Content Box End */}
                    </div>
                </div>
            </section>
        </LayoutAuthed>
    );
};

export default Login;
