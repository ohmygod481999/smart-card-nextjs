import {
    SelfServiceSettingsFlow,
    SubmitSelfServiceSettingsFlowBody,
} from "@ory/client";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import AvatarDrop from "../../../components/AvatarDrop";
import InforSetting from "../../../components/InforSetting";
import Layout from "../../../components/Layout";
import SessionContext from "../../../context/session-context";
import {
    ActionCard,
    useLogoutHandler,
    Flow,
    Messages,
    Methods,
    ory,
} from "../../../pkg";
import { handleFlowError } from "../../../pkg/errors";

interface Props {
    flow?: SelfServiceSettingsFlow;
    only?: Methods;
}

function SettingsCard({
    flow,
    only,
    children,
}: Props & { children: ReactNode }) {
    if (!flow) {
        return null;
    }

    const nodes = only
        ? flow.ui.nodes.filter(({ group }) => group === only)
        : flow.ui.nodes;

    if (nodes.length === 0) {
        return null;
    }

    return <ActionCard wide>{children}</ActionCard>;
}

const Account: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [flow, setFlow] = useState<SelfServiceSettingsFlow>();
    const { session } = useContext(SessionContext);

    const { flow: flowId, return_to: returnTo } = router.query;

    useEffect(() => {
        // If the router is not ready yet, or we already have a flow, do nothing.
        if (!router.isReady || flow) {
            return;
        }

        if (session === null) {
            router.push(`/${id}/login`);
        }

        // If ?flow=.. was in the URL, we fetch it
        if (flowId) {
            ory.getSelfServiceSettingsFlow(String(flowId))
                .then(({ data }) => {
                    setFlow(data);
                })
                .catch(handleFlowError(router, "settings", setFlow));
            return;
        }

        // Otherwise we initialize it
        ory.initializeSelfServiceSettingsFlowForBrowsers(
            returnTo ? String(returnTo) : undefined
        )
            .then(({ data }) => {
                setFlow(data);
            })
            .catch(handleFlowError(router, "settings", setFlow));
    }, [flowId, router, router.isReady, returnTo, flow, session]);

    const onSubmit = (values: SubmitSelfServiceSettingsFlowBody) =>
        router
            // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
            // his data when she/he reloads the page.
            .push(`/${id}/account?flow=${flow?.id}`, undefined, {
                shallow: true,
            })
            .then(() =>
                ory
                    .submitSelfServiceSettingsFlow(String(flow?.id), values)
                    .then(({ data }) => {
                        // The settings have been saved and the flow was updated. Let's show it to the user!
                        setFlow(data);
                    })
                    .catch(handleFlowError(router, "settings", setFlow))
                    .catch(async (err: AxiosError) => {
                        // If the previous handler did not catch the error it's most likely a form validation error
                        if (err.response?.status === 400) {
                            // Yup, it is!
                            setFlow(err.response?.data);
                            return;
                        }

                        return Promise.reject(err);
                    })
            );

    const onLogout = useLogoutHandler(id);

    return (
        <Layout id={id}>
            <section id="about" className="section active">
                <div className="homecolor-box" />
                <div className="common_bg animate__animated animate__fadeInDown">
                    <div className="container">
                        <div className="about-content">
                            {/* About Title Start*/}
                            <div className="row ">
                                <div className="col-12 ">
                                    <div className="section-title animate__animated animate__fadeInDown animate__delay-1s">
                                        <p className="common-desctiption">
                                            my intro
                                        </p>
                                        <h1 className="common-title">
                                            Sửa <span>Thông tin</span>
                                        </h1>
                                        <div className="animated-bar" />
                                    </div>
                                </div>
                            </div>

                            <div className="row single-section">
                                <div className="col-12 ">
                                    {router.isReady && <InforSetting id={id} />}
                                    {/* <AvatarDrop /> */}

                                    {/* <SettingsCard only="profile" flow={flow}>
                                        <h3>Profile Settings</h3>
                                        <Messages
                                            messages={flow?.ui.messages}
                                        />
                                        <Flow
                                            hideGlobalMessages
                                            onSubmit={onSubmit}
                                            only="profile"
                                            flow={flow}
                                        />
                                    </SettingsCard> */}
                                    <SettingsCard only="password" flow={flow}>
                                        <h3>Change Password</h3>

                                        <Messages
                                            messages={flow?.ui.messages}
                                        />
                                        <Flow
                                            hideGlobalMessages
                                            onSubmit={onSubmit}
                                            only="password"
                                            flow={flow}
                                        />
                                    </SettingsCard>
                                    <SettingsCard only="oidc" flow={flow}>
                                        <h3>Manage Social Sign In</h3>

                                        <Messages
                                            messages={flow?.ui.messages}
                                        />
                                        <Flow
                                            hideGlobalMessages
                                            onSubmit={onSubmit}
                                            only="oidc"
                                            flow={flow}
                                        />
                                    </SettingsCard>

                                    <div
                                        style={{
                                            maxWidth: "680px",
                                            padding: "2px 20px",
                                            margin: "auto"
                                        }}
                                    >
                                        <button
                                            style={{
                                                width: "100%",
                                                border: "none",
                                                fontSize: "14px",
                                                lineHeight: "20px",
                                                padding: "8px"
                                            }}
                                            onClick={onLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Account;
