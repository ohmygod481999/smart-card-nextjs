import { gql } from "@apollo/client";

export const UPDATE_ACCOUNT = gql`
    mutation updateAccount(
        $id: Int!
        $name: String
        $phone: String
        $description: String
        $email: String
    ) {
        update_account_by_pk(
            pk_columns: { id: $id }
            _set: {
                name: $name
                phone: $phone
                description: $description
                email: $email
            }
        ) {
            id
            name
            phone
            description
            email
        }
    }
`;

export const UPDATE_AVATAR_ACCOUNT = gql`
    mutation updateAccount($id: Int!, $avatar: String!) {
        update_account_by_pk(
            pk_columns: { id: $id }
            _set: { avatar: $avatar }
        ) {
            avatar
        }
    }
`;
