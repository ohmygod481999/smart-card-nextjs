import { gql } from "@apollo/client";

export const GET_ACCOUNT = gql`
    query getAccount($id: Int!) {
        account_by_pk(id: $id) {
            id
            ory_id
            user_info {
                traits
                recovery_addresses {
                    id
                    status
                    updated_at
                    value
                }
                credentials
            }
        }
    }
`;

export const GET_ACCOUNT_BY_ORY_ID = gql`
    query getAccountByOryId($ory_id: uuid) {
        account(where: { ory_id: { _eq: $ory_id } }) {
            id
        }
    }
`;

export const GET_REFEREES = gql`
    query getReferees($ory_id: uuid!) {
        account(where: { ory_id: { _eq: $ory_id } }) {
            id
            ory_id
            name
            user_info {
                traits
            }
            created_at
            referees {
                id
                ory_id
                name
                created_at
            }
            is_agency
        }
    }
`;

export const GET_REFEREES_BY_ACCOUNT_ID = gql`
    query getReferees($id: Int!) {
        account(where: { id: { _eq: $id } }) {
            id
            ory_id
            name
            user_info {
                traits
            }
            created_at
            referees {
                id
                ory_id
                name
                created_at
            }
            is_agency
        }
    }
`;

export const GET_ACCOUNTS = gql`
    query getAccounts($limit: Int!, $offset: Int!) {
        account_aggregate {
            aggregate {
                count
            }
        }
        account(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
            id
            name
            email
            phone
            is_agency
            created_at
        }
    }
`;
