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
