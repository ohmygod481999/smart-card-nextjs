import { gql } from "@apollo/client";

export const GET_WALLETS = gql`
    query getWallet($account_id: Int!) {
        wallet(where: { account_id: { _eq: $account_id } }) {
            id
            amount
            type
            bank_name
            bank_number
        }
    }
`;

export const UPDATE_BANK_ACCOUNT = gql`
    mutation updateBankAccount(
        $wallet_id: Int!
        $bank_name: String!
        $bank_number: String!
    ) {
        update_wallet_by_pk(
            pk_columns: { id: $wallet_id }
            _set: { bank_name: $bank_name, bank_number: $bank_number }
        ) {
            id
            bank_name
            bank_number
        }
    }
`;
