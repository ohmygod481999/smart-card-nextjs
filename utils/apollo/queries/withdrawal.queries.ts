import { gql } from "@apollo/client";

export const GET_WITHDRAWALS_BY_ACCOUNT_ID = gql`
    query getWithdrawalsByAccountId($account_id: Int!) {
        withdrawal(
            where: {
                account_id: { _eq: $account_id }
                status: { _eq: "success" }
            }
        ) {
            id
            amount
            status
            created_at
        }
    }
`;
