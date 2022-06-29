import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: "http://139.59.234.34/v1/graphql",
    // uri: "https://smartmark.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
        "content-type": "application/json",
        // "x-hasura-admin-secret":
        //     process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
    },
});
