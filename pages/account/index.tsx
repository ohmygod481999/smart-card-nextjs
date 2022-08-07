import { useLazyQuery } from "@apollo/client";
import {
    SelfServiceSettingsFlow,
    SubmitSelfServiceSettingsFlowBody,
} from "@ory/client";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import AccountTab from "../../components/account.tsx/AccountTab";
import SettingTab from "../../components/account.tsx/SettingTab";
import AvatarDrop from "../../components/AvatarDrop";
import InforSetting from "../../components/account.tsx/InforSetting";
import Layout from "../../components/Layout";
import LayoutAuthed from "../../components/LayoutAuthed";
import SessionContext from "../../context/session-context";
import {
    ActionCard,
    useLogoutHandler,
    Flow,
    Messages,
    Methods,
    ory,
} from "../../pkg";
import { handleFlowError } from "../../pkg/errors";
import { Account } from "../../types/global";
import { getDataGraphqlResult } from "../../utils";
import { GET_CARD_BY_ORY_ID } from "../../utils/apollo/queries/card.queries";

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

enum AccountTabValue {
    INFO,
    SETTING,
}

const Account: NextPage = () => {
    const router = useRouter();

    const [flow, setFlow] = useState<SelfServiceSettingsFlow>();
    const { session } = useContext(SessionContext);

    const [account, setAccount] = useState<Account>();
    const [tab, setTab] = useState<AccountTabValue>(AccountTabValue.INFO);

    const [getCardByOryId, { called, loading, data }] =
        useLazyQuery(GET_CARD_BY_ORY_ID);

    useEffect(() => {
        if (session) {
            console.log(session);
            getCardByOryId({
                variables: {
                    ory_id: session.identity.id,
                },
            });
        }
    }, [session]);

    console.log(data);

    useEffect(() => {
        if (data) {
            const cards = getDataGraphqlResult(data);
            if (cards && cards.length > 0) {
                setAccount(cards[0].account);
            }
        }
    }, [data]);

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp - Tài khoản</title>
            </Head>
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
                                            my info
                                        </p>
                                        <h1 className="common-title">
                                            Sửa <span>Thông tin</span>
                                        </h1>
                                        <div className="animated-bar" />
                                    </div>
                                </div>
                            </div>

                            <div className="wallet-tab-list">
                                <div
                                    className={`wallet-tab ${
                                        tab === AccountTabValue.INFO
                                            ? "activate"
                                            : ""
                                    }`}
                                    onClick={() => setTab(AccountTabValue.INFO)}
                                >
                                    Tài khoản
                                </div>
                                <div
                                    className={`wallet-tab ${
                                        tab === AccountTabValue.SETTING
                                            ? "activate"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setTab(AccountTabValue.SETTING)
                                    }
                                >
                                    Khác
                                </div>
                            </div>

                            <AccountTab
                                account={account}
                                hidden={tab === AccountTabValue.INFO}
                            />

                            {tab === AccountTabValue.SETTING && <SettingTab account={account}/>}
                        </div>
                    </div>
                </div>
            </section>
        </LayoutAuthed>
    );
};

export default Account;
