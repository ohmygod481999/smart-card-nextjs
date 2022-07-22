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

export const GET_AGENCY_REGISTRATIONS_ADMIN = gql`
    query getRegistration($limit: Int!, $offset: Int!) {
        registration(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { approved: { _eq: false }, type: { _eq: 0 } }
        ) {
            id
            account_id
            approved
            created_at
            account {
                id
                name
                email
                phone
            }
        }
    }
`;

export const GET_WITHDRAW_REGISTRATIONS_ADMIN = gql`
    query getRegistration($limit: Int!, $offset: Int!) {
        registration(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { approved: { _eq: false }, type: { _eq: 1 } }
        ) {
            id
            account_id
            approved
            created_at
            payload
            account {
                id
                name
                email
                phone
                wallets {
                    id
                    type
                    amount
                    bank_name
                    bank_number
                }
            }
        }
    }
`;
