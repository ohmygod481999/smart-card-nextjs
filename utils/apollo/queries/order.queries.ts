import { gql } from "@apollo/client";

export const GET_ORDER_BY_ACCOUNT_ID = gql`
    query getOrderByAccountId($account_id: Int!, $status: Int!) {
        order(
            where: { agency_id: { _eq: $account_id }, status: { _eq: $status } }
        ) {
            id
            status
        }
    }
`;
