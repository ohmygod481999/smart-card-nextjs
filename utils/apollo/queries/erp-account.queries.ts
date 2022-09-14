import { gql } from "@apollo/client";

export const GET_ERP_REGISTRATION_BY_ACCOUNT_ID = gql`
    query getErpRegistrationByAccountId($account_id: Int!) {
        erp_account(
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

export const GET_ERP_REGISTRATION_PAGING = gql`
    query getErpRegistrationByAccountId($limit: Int!, $offset: Int!) {
        erp_account(
            where: { status: { _eq: "created" } }
            limit: $limit
            offset: $offset
        ) {
            id
            account_id
            account {
                id
                email
            }
            company_id
            company_name
            status
            created_at
        }
        erp_account_aggregate(where: { status: { _eq: "created" } }) {
            aggregate {
                count
            }
        }
    }
`;
