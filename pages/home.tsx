import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

import { Identity } from "@ory/client";

import SessionContext from "../context/session-context";
import LayoutAuthed from "../components/LayoutAuthed";
import { GET_CARD_BY_ORY_ID } from "../utils/apollo/queries/card.queries";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Account } from "../types/global";
import { getDataGraphqlResult } from "../utils";
import { get } from "lodash";
import AccountCard from "../components/AccountCard";
import Head from "next/head";

// const ory = new V0alpha2Api(new Configuration(edgeConfig));

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = (identity: Identity) =>
    identity?.traits?.email || identity?.traits?.username;

const Home: NextPage = () => {
    const router = useRouter();

    const { session, updateSession } = useContext(SessionContext);
    const [account, setAccount] = useState<Account>();

    const [getCardByOryId, { called, loading, data }] =
        useLazyQuery(GET_CARD_BY_ORY_ID);

    useEffect(() => {
        if (session) {
            getCardByOryId({
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
            const cards = getDataGraphqlResult(data);
            if (cards && cards.length > 0) {
                setAccount(cards[0].account);
            }
        }
    }, [data]);

    console.log(account);

    return (
        <LayoutAuthed>
            <Head>
                <title>Smartcardnp{account?.name ? ` - ${account?.name}` : ""}</title>
            </Head>
            <AccountCard account={account} />
        </LayoutAuthed>
    );
};

export default Home;
