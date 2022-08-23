import { gql } from "@apollo/client";

export const GET_CARD = gql`
    query getCard($id: Int!) {
        card_by_pk(id: $id) {
            id
            account_id
            account {
                id
                ory_id
                avatar
                email
                name
                phone
                facebook
                zalo
                website
                slide_text
                description
                user_cv {
                    id
                    path
                }
            }
        }
    }
`;

export const GET_CARD_BY_ORY_ID = gql`
    query getCardByOryId($ory_id: uuid!) {
        card(where: { account: { ory_id: { _eq: $ory_id } } }) {
            id
            account {
                id
                name
                avatar
                phone
                email
                facebook
                zalo
                website
                slide_text
                description
                is_agency
            }
        }
    }
`;
