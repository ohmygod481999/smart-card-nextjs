import { gql } from "@apollo/client";

export const GET_REGISTRATION_BY_ACCOUNT_ID = gql`
    query getRegistrationByAccountId($account_id: Int!) {
        registration(where: { account_id: { _eq: $account_id } }) {
            id
            account_id
            type
        }
    }
`;
