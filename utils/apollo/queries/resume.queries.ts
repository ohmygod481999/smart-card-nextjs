import { gql } from "@apollo/client";

export const GET_RESUME = gql`
    query getResume($account_id: Int!) {
        resume(where: { account_id: { _eq: $account_id } }) {
            id
            path
        }
    }
`;
