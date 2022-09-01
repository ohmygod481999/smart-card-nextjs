import { gql } from "@apollo/client";

export const GET_WALLET = gql`
    query getWallet {
        wallet {
            balance
            secondary_balance
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
