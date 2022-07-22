import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ProductI, ProductModel1 } from 'src/app/models/product.model';
import { GET_PRODUCT, GET_PRODUCTS, EDIT_PRODUCT } from 'src/app/querys/product.query';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apollo: Apollo) { }

  getProducts(): Observable<ApolloQueryResult<ProductI>> {
    return this.apollo.watchQuery<ProductI>({
      query: GET_PRODUCTS
    }).valueChanges
  }
  
  getProduct(id: string): Observable<ApolloQueryResult<ProductI>> {
    return this.apollo.watchQuery<ProductI>({
      query: GET_PRODUCT,
      variables: {
        id
      }
    }).valueChanges
  }
  
  editProduct(id: string, product: ProductModel1): Observable<MutationResult<string>> {
    return this.apollo.mutate<string>({
      mutation: EDIT_PRODUCT,
      variables: {
        id,
        values: product
      }
    })
  }
}
