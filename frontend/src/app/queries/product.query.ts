import { gql } from "apollo-angular";

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      price
      stock
      created_at
      category {
        id
        name
        created_at
        status
      }
      image
      status
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      price
      stock
      created_at
      category {
        id
        name
        created_at
        status
      }
      image
      status
    }
  }
`

export const EDIT_PRODUCT = gql`
  mutation UpdateProduct($values: ProductInput!) {
    updateProduct(values: $values)
}
`


// mutation ($id: ID!, $values: ProductInput!) {
//   updateProduct(id: $id, values: $values)
// }