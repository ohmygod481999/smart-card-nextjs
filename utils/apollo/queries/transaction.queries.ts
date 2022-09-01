import { gql } from "@apollo/client";

export const GET_TRANSATION = gql`
    query getTransaction($account_id: Int!) {
        transaction(
            where: {
                _or: [
                    { source_id: { _eq: $account_id } }
                    { target_id: { _eq: $account_id } }
                ]
            }
            order_by: { created_at: desc }
        ) {
            id
            amount
            type
            created_at
        }
    }
`;
