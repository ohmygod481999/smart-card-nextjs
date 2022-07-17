import { gql } from "@apollo/client";

export const GET_AGENCY_REGISTRATION_BY_ACCOUNT_ID = gql`
    query getRegistrationByAccountId($account_id: Int!) {
        registration(
            where: { account_id: { _eq: $account_id }, type: { _eq: 0 } }
        ) {
            id
            account_id
            type
        }
    }
`;

export const GET_WITHDRAW_REGISTRATION_BY_ACCOUNT_ID = gql`
    query getRegistrationByAccountId($account_id: Int!, $approved: Boolean) {
        registration(
            where: {
                account_id: { _eq: $account_id }
                type: { _eq: 1 }
                approved: { _eq: $approved }
            }
        ) {
            id
            account_id
            type
            approved
            payload
            created_at
        }
    }
`;

export const GET_REGISTRATION_BY_ID = gql`
    query getRegistrationById($registration_id: Int!) {
        registration_by_pk(id: $registration_id) {
            id
            account_id
            type
            approved
        }
    }
`;
