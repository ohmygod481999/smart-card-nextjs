import { gql } from "@apollo/client";

export const GET_TRANSATIONS = gql`
    query getTransaction($account_id: Int!) {
        transaction(
            where: {
                _or: [
                    { source_id: { _eq: $account_id } }
                    { target_id: { _eq: $account_id } }
                ]
            }
            order_by: { created_at: desc }
        ) {
            id
            amount
            source_id
            account {
                id
                email
            }
            target_id
            accountByTargetId {
                id
                email
            }
            type
            created_at
        }
    }
`;

export const GET_SECONDARY_TRANSATIONS = gql`
    query getSecondaryTransaction($account_id: Int!) {
        secondary_transaction(
            where: { account_id: { _eq: $account_id } }
            order_by: { created_at: desc }
        ) {
            id
            amount
            account {
                id
                email
            }

            type
            created_at
        }
    }
`;

export const GET_DETAIL_TRANSATION = gql`
    query getTransaction($id: uuid!) {
        transaction_by_pk(id: $id) {
            id
            amount
            source_id
            account {
                id
                email
            }
            target_id
            accountByTargetId {
                id
                email
            }
            type
            created_at
            order_id
            vendor {
                id
                name
            }
            referral {
                id
                target_id
                referee_id
                account {
                    id
                    email
                    agency {
                        id
                    }
                }
                accountByRefererId {
                    id
                    email
                    agency {
                        id
                    }
                }
                accountByTargetId {
                    id
                    email
                    agency {
                        id
                    }
                }
                level
                referer_id
            }
        }
    }
`;

export const GET_PAYMENT_TRANSATION = gql`
    query getPaymentTransaction($account_id: Int!) {
        transaction(
            where: { type: { _eq: "payment" }, source_id: { _eq: $account_id } }
        ) {
            id
            amount
            created_at
        }
    }
`;

export const GET_TRANSFER_TRANSATION = gql`
    query getPaymentTransaction($account_id: Int!) {
        transaction(
            where: {
                type: { _eq: "transfer" }
                _or: [
                    { source_id: { _eq: $account_id } }
                    { target_id: { _eq: $account_id } }
                ]
            }
        ) {
            id
            amount
            created_at
            source_id
            account {
                id
                email
            }
            target_id
            accountByTargetId {
                id
                email
            }
        }
    }
`;
