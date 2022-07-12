import { gql } from "@apollo/client";

export const INSERT_AGENCY_REGISTRATION = gql`
    mutation insertAgencyRegistration($account_id: Int!, $type: Int!) {
        insert_registration_one(
            object: { account_id: $account_id, type: $type }
        ) {
            account_id
            id
            type
        }
    }
`;
