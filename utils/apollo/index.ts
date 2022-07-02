import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    // uri: process.env.HASURA_URL,
    uri: "https://hasura.smartcardnp.vn/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
        "content-type": "application/json",
        // "x-hasura-admin-secret":
        //     process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
    },
});
