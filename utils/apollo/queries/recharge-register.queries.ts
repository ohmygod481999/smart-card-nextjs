import { gql } from "@apollo/client";

export const GET_RECHARGE_UNAPPROVED_REGISTRATION_BY_ACCOUNT_ID = gql`
    query getRechargeRegsiterUnapproved($account_id: Int!) {
        recharge_register(
            where: {
                account_id: { _eq: $account_id }
                status: { _eq: "created" }
            }
        ) {
            id
            amount
            status
            account_id
            created_at
        }
    }
`;

export const GET_RECHARGE_REGISTRATION_PAGING = gql`
    query getRechargeRegisterPaging(
        $status: recharge_register_status_enum!
        $limit: Int!
        $offset: Int!
    ) {
        recharge_register_aggregate(where: { status: { _eq: $status } }) {
            aggregate {
                count
            }
        }
        recharge_register(
            where: { status: { _eq: $status } }
            limit: $limit
            offset: $offset
        ) {
            id
            account {
                id
                email
            }
            account_id
            amount
            created_at
        }
    }
`;
