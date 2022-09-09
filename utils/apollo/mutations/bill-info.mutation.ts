import { gql } from "@apollo/client";

export const INSERT_BILL_INFO = gql`
    mutation createBillInfo(
        $account_id: Int!
        $type: bill_info_type_enum!
        $payload: jsonb
    ) {
        insert_bill_info_one(
            object: { account_id: $account_id, type: $type, payload: $payload }
        ) {
            id
            type
            payload
            account_id
            created_at
        }
    }
`;

export const UPDATE_BILL_INFO = gql`
    mutation updateBillInfo($id: Int!, $payload: jsonb) {
        update_bill_info_by_pk(
            pk_columns: { id: $id }
            _set: { payload: $payload }
        ) {
            id
            type
            payload
            account_id
            created_at
        }
    }
`;
