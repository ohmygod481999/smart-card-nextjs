import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
    mutation (
        $account_id: Int!
        $order_items: order_item_arr_rel_insert_input!
        $status: Int!
        $shipping_type: Int!
        $payment_type: Int!
        $customer_phone: String
        $customer_name: String
        $customer_address: String
    ) {
        insert_order_one(
            object: {
                agency_id: $account_id
                order_items: $order_items
                status: $status
                shipping_type: $shipping_type
                payment_type: $payment_type
                customer_name: $customer_name
                customer_phone: $customer_phone
                customer_address: $customer_address
            }
        ) {
            id
            created_at
            status
        }
    }
`;
