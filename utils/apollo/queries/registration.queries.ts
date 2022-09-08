import { gql } from "@apollo/client";

export const GET_AGENCY_REGISTRATION_BY_ACCOUNT_ID = gql`
    query getRegistrationByAccountId($account_id: Int!) {
        agency_register(
            where: {
                account_id: { _eq: $account_id }
                status: { _eq: "created" }
            }
        ) {
            id
            account_id
            status
        }
    }
`;

export const GET_WITHDRAW_REGISTRATION_BY_ACCOUNT_ID = gql`
    query getRegistrationByAccountId(
        $account_id: Int!
        $status: withdrawal_status_enum
    ) {
        withdrawal(
            where: {
                account_id: { _eq: $account_id }
                status: { _eq: $status }
            }
        ) {
            id
            account_id
            status
            amount
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
        agency_register(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { status: { _eq: "created" }, type: { _eq: "agency" } }
        ) {
            id
            account_id
            created_at
            type
            account {
                id
                email
                account_info {
                    phone
                }
            }
        }
    }
`;

export const GET_COLABORATOR_REGISTRATIONS_ADMIN = gql`
    query getRegistration($limit: Int!, $offset: Int!) {
        agency_register(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { status: { _eq: "created" }, type: { _eq: "colaborator" } }
        ) {
            id
            account_id
            created_at
            type
            account {
                id
                email
                account_info {
                    phone
                }
            }
        }
    }
`;

export const GET_WITHDRAW_REGISTRATIONS_ADMIN = gql`
    query getRegistration($limit: Int!, $offset: Int!) {
        withdrawal(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: { status: { _eq: "pending" } }
        ) {
            id
            account_id
            amount
            created_at
            account {
                id
                email
                account_info {
                    name
                    phone
                    bank_name
                    bank_number
                }
            }
        }
    }
`;
