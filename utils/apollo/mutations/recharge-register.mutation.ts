import { gql } from "@apollo/client";

export const INSERT_RECHARGE_REGISTER = gql`
    mutation registerRecharge(
        $account_id: Int!
        $amount: Int!
        $status: recharge_register_status_enum!
    ) {
        insert_recharge_register_one(
            object: {
                account_id: $account_id
                amount: $amount
                status: $status
            }
        ) {
            id
            amount
            account_id
            created_at
        }
    }
`;
