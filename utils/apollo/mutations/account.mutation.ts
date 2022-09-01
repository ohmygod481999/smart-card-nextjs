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
        $website: String
    ) {
        update_account_info(
            where: { account: { id: { _eq: $id } } }
            _set: {
                name: $name
                phone: $phone
                description: $description
                email: $email
                facebook: $facebook
                zalo: $zalo
                slide_text: $slide_text
                website: $website
            }
        ) {
            affected_rows
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
