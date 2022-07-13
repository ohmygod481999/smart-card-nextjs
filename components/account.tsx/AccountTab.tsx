import {
    SelfServiceSettingsFlow,
    SubmitSelfServiceSettingsFlowBody,
} from "@ory/client";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import SessionContext from "../../context/session-context";
import {
    ActionCard,
    Flow,
    Messages,
    Methods,
    ory,
    useLogoutHandler,
} from "../../pkg";
import { handleFlowError } from "../../pkg/errors";
import { Account } from "../../types/global";
import AvatarDrop from "../AvatarDrop";
import InforSetting from "../InforSetting";

interface Props {
    account: Account | undefined;
    hidden: boolean;
    // flow: SelfServiceSettingsFlow;
}

interface SettingsCardProps {
    flow?: SelfServiceSettingsFlow;
    only?: Methods;
}

function SettingsCard({
    flow,
    only,
    children,
}: SettingsCardProps & { children: ReactNode }) {
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

function AccountTab(props: Props) {
    const { account, hidden } = props;
    const router = useRouter();

    const { session } = useContext(SessionContext);

    const [flow, setFlow] = useState<SelfServiceSettingsFlow>();

    const { flow: flowId, return_to: returnTo } = router.query;

    useEffect(() => {
        // If the router is not ready yet, or we already have a flow, do nothing.
        if (!router.isReady || flow) {
            return;
        }

        if (session === null) {
            router.push(`/login`);
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
            .push(`/account?flow=${flow?.id}`, undefined, {
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
                    .catch(async (err: any) => {
                        // If the previous handler did not catch the error it's most likely a form validation error
                        if (err.response?.status === 400) {
                            // Yup, it is!
                            setFlow(err.response?.data);
                            return;
                        }

                        return Promise.reject(err);
                    })
            );

    const onLogout = useLogoutHandler();

    return (
        <div
            className="row single-section animate__animated animate__fadeInDown animate__delay-1s"
            style={{
                display: hidden ? "block" : "none",
            }}
        >
            <div className="col-12 ">
                {account && <InforSetting account={account} />}
                <AvatarDrop account={account} />

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
                    <h3>Đổi mật khẩu</h3>

                    <Messages messages={flow?.ui.messages} />
                    <Flow
                        hideGlobalMessages
                        onSubmit={onSubmit}
                        only="password"
                        flow={flow}
                    />
                </SettingsCard>
                <SettingsCard only="oidc" flow={flow}>
                    <h3>Manage Social Sign In</h3>

                    <Messages messages={flow?.ui.messages} />
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
                        margin: "auto",
                    }}
                >
                    <button
                        style={{
                            width: "100%",
                            border: "none",
                            fontSize: "14px",
                            lineHeight: "20px",
                            padding: "8px",
                        }}
                        onClick={() =>
                            onLogout()?.then(() => {
                                router.push("/login");
                            })
                        }
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AccountTab;
