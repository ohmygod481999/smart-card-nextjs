import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { Identity } from "@ory/client";
import Layout from "../../../components/Layout";
import SessionContext from "../../../context/session-context";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CARD } from "../../../utils/apollo/queries/card.queries";
import { getDataGraphqlResult, getValueFromGraphql } from "../../../utils";
import { Account, AccountInfo, CardInfo } from "../../../types/global";
import useGetCardInfo from "../../../hooks/useGetCardInfo";
import CardDontExist from "../../../components/CardDontExist";
import Loading from "../../../components/Loading";
import { apolloClient } from "../../../utils/apollo";
import { GET_ACCOUNT } from "../../../utils/apollo/queries/account.queries";
import RegisterCard from "../../../components/RegisterCard";
import { get } from "lodash";
import AccountCard from "../../../components/AccountCard";

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = (identity: Identity) =>
    identity?.traits?.email || identity?.traits?.username;

interface HomeProps {
    cardInfo: CardInfo;
    accountInfo: Account;
}

const Home = ({ cardInfo, accountInfo }: HomeProps) => {
    // const { cardInfo } = props;
    const router = useRouter();

    // card id
    const { id } = router.query;

    const { session, updateSession } = useContext(SessionContext);
    console.log(accountInfo);
    // const traits = accountInfo?.user_info?.traits
    //     ? JSON.parse(accountInfo?.user_info?.traits)
    //     : null;

    if (!cardInfo) {
        // The ko ton tai
        console.log("The ko ton tai");
        return <CardDontExist />;
    } else if (!cardInfo.account_id) {
        // The chua dang ky
        console.log("The chua dang ky");
        return <RegisterCard id={id} />;

        // Gio cho ho 1 cai form dang ky (Form co san or minh custom)

        // dang ky xong => ory co tai khoan => webhook tao ra 1 tai khoan trong hasura

        // update the: account_id = new_account.id
    } else {
        // da co thong tin
    }

    return (
        <Layout id={id}>
            <AccountCard account={accountInfo} />
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

export default Home;
