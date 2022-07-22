import { gql } from "apollo-angular";

export const GET_PRODUCTS = gql`
  {
    getProducts{
      id
      name
      price
      stock
      created_at
      image
      status
      category {
        id
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query ($id: ID!) {
    getProduct(id: $id) {
      id
      name
      price
      stock
      created_at
      image
      status
      category {
        id
        name
        created_at
      }
    }
  }
`

export const EDIT_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $values: ProductInput!) {
    updateProduct(id: $id, values: $values)
  }
`


// mutation ($id: ID!, $values: ProductInput!) {
//   updateProduct(id: $id, values: $values)
// }