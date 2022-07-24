import { gql } from "@apollo/client";

export const GET_TRANSATION = gql`
    query getTransaction($account_id: Int!) {
        transaction(
            where: {
                _or: [
                    { wallet: { account_id: { _eq: $account_id } } }
                    { walletFromWalletId: { account_id: { _eq: $account_id } } }
                ]
            }
            order_by: { date: desc }
        ) {
            id
            amount
            type
            date
            wallet_id
            from_wallet_id
        }
    }
`;
