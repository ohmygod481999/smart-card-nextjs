import { gql } from "@apollo/client";

export const GET_ORDER_BY_ID = gql`
    query getOrderById($id: uuid!) {
        order_by_pk(id: $id) {
            id
            order_items {
                quantity
                product {
                    name
                    price
                }
            }
        }
    }
`;

export const GET_ORDERS = gql`
    query ($statuses: [order_status_enum!]) {
        order(where: { status: { _in: $statuses } }) {
            id
            status
            agency_id
            customer_name
            customer_phone
            customer_address
            payment_type
            shipping_type
            order_items {
                product {
                    name
                    price
                }
                quantity
            }
            created_at
        }
    }
`;

export const GET_ORDERS_BY_ACCOUNT_ID = gql`
    query getOrderByAccountId($account_id: Int!, $status: order_status_enum) {
        order(
            where: { agency_id: { _eq: $account_id }, status: { _eq: $status } }
        ) {
            id
            status
        }
    }
`;

export const GET_ALL_ORDER_BY_ACCOUNT_ID = gql`
    query getOrderByAccountId($account_id: Int!) {
        order(where: { agency_id: { _eq: $account_id } }) {
            id
            status
            agency_id
            shipping_type
            customer_name
            customer_phone
            customer_address
            payment_type
            order_items {
                product_id
                quantity
                product {
                    id
                    name
                    price
                    description
                    thumbnail
                    created_at
                }
            }
            created_at
        }
    }
`;
