import { gql } from "@apollo/client";

export const GET_WALLETS = gql`
    query getWallet($account_id: Int!) {
        wallet(where: { account_id: { _eq: $account_id } }) {
            id
            amount
            type
        }
    }
`;
