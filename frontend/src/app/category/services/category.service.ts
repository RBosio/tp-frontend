import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CategoryI } from 'src/app/models/category.model';
import { GET_CATEGORIES } from 'src/app/querys/category.query';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apollo: Apollo) { }

  getAll(): Observable<ApolloQueryResult<CategoryI>> {
    return this.apollo.watchQuery<CategoryI>({
      query: GET_CATEGORIES
    }).valueChanges
  }
}
