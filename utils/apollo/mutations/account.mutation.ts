import { gql } from "@apollo/client";

export const UPDATE_ACCOUNT = gql`
    mutation updateAccount(
        $id: Int!
        $name: String
        $phone: String
        $description: String
        $email: String
        $facebook: String
        $zalo: String
        $slide_text: String
    ) {
        update_account_by_pk(
            pk_columns: { id: $id }
            _set: {
                name: $name
                phone: $phone
                description: $description
                email: $email
                facebook: $facebook
                zalo: $zalo
                slide_text: $slide_text
            }
        ) {
            id
            name
            phone
            description
            email
            facebook
            zalo
            slide_text
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
