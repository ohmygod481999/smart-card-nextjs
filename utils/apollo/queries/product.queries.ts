import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query getProducts {
        product {
            id
            name
            price
            description
            thumbnail
            created_at
        }
    }
`;
