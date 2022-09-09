import { gql } from "@apollo/client";

export const GET_BILL_INFO = gql`
    query getBillInfo($account_id: Int!, $type: bill_info_type_enum!) {
        bill_info(
            where: {
                _and: [
                    { account_id: { _eq: $account_id } }
                    { type: { _eq: $type } }
                ]
            }
        ) {
            id
            type
            payload
            account_id
            created_at
        }
    }
`;

export const GET_BILL_INFOS_PAGING = gql`
    query getBillInfoPaging(
        $type: bill_info_type_enum!
        $limit: Int!
        $offset: Int!
    ) {
        bill_info_aggregate(where: { type: { _eq: $type } }) {
            aggregate {
                count
            }
        }
        bill_info(
            where: { type: { _eq: $type } }
            limit: $limit
            offset: $offset
        ) {
            id
            type
            payload
            account {
                id
                email
            }
            created_at
        }
    }
`;
