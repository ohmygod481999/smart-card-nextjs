import { gql } from "@apollo/client";

export const GET_TRANSATION = gql`
    query getTransaction($account_id: Int!) {
        transaction(where: { wallet: { account_id: { _eq: $account_id } } }) {
            id
            amount
            type
            date
            wallet_id
        }
    }
`;
