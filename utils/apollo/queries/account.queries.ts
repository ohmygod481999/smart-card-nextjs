import { gql } from "@apollo/client";

export const GET_ACCOUNT = gql`
    query getAccount($id: Int!) {
        account_by_pk(id: $id) {
            id
            ory_id
            user_info {
                traits
                recovery_addresses {
                    id
                    status
                    updated_at
                    value
                }
                credentials
            }
        }
    }
`;