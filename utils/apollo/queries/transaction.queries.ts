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
                is_root
            }
            target_id
            accountByTargetId {
                id
                email
            }
            type
            note
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
            note
            source_id
            account {
                id
                email
                is_root
            }
            target_id
            accountByTargetId {
                id
                email
                is_root
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
                        type
                    }
                }
                accountByRefererId {
                    id
                    email
                    agency {
                        id
                        type
                    }
                }
                accountByTargetId {
                    id
                    email
                    agency {
                        id
                        type
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
                is_root
            }
            target_id
            accountByTargetId {
                id
                email
                is_root
            }
        }
    }
`;

export const GET_REFER_AGENCY_TRANSACTIONS_BY_ACCOUNT = gql`
    query getAgencyTransactioAccount($account_id: Int!) {
        transaction(
            where: {
                target_id: { _eq: $account_id }
                type: { _in: ["reward-refer-agency"] }
            }
        ) {
            id
            type
            amount
            created_at
            referral {
                level
                accountByRefererId {
                    id
                    email
                }
                account {
                    id
                    email
                }
            }
        }
    }
`;

export const GET_REFER_COLABORATOR_TRANSACTIONS_BY_ACCOUNT = gql`
    query getColaboratorTransactioAccount($account_id: Int!) {
        transaction(
            where: {
                target_id: { _eq: $account_id }
                type: { _in: ["reward-refer-colaborator"] }
            }
        ) {
            id
            type
            amount
            created_at
            referral {
                level
                accountByRefererId {
                    id
                    email
                }
                account {
                    id
                    email
                }
            }
        }
    }
`;
