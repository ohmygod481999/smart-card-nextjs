import { gql } from "@apollo/client";

export const INSERT_REGISTRATION = gql`
    mutation insertAgencyRegistration(
        $account_id: Int!
        $type: Int!
        $payload: jsonb
    ) {
        insert_registration_one(
            object: { account_id: $account_id, type: $type, payload: $payload }
        ) {
            account_id
            id
            type
        }
    }
`;
