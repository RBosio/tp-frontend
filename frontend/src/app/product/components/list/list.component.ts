import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category/services/category.service';
import { CategoryI } from 'src/app/models/category.model';
import { ProductI, ProductModel } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  categorySubscription: Subscription
  productSubscription: Subscription
  detailSubscription: Subscription

  categories: CategoryI[]
  products: ProductI[]
  productsFiltered: ProductI[]
  productDetail: ProductI
  BASE_URL: string

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.BASE_URL = 'http://localhost:3000/img/'
    const category = {
      id: 0,
      name: '',
      created_at: new Date(),
      status: false
    }
    this.productDetail = new ProductModel()
    this.productDetail.category = category
  }

  ngOnInit(): void {
    this.categorySubscription = this.categoryService.getAll().subscribe((result: any) => {
      this.categories = result?.data.getCategories
      this.categories = this.categories.filter(category => category.status)
    })
    this.productSubscription = this.productService.getProducts().subscribe((result: any) => {
      this.products = result?.data.getProducts
      this.products = this.products.filter(product => product.status)
      this.productsFiltered = this.products
    })
  }

  filterByCategory({ target }){
    const value = target.value
    if(value != 0) {
      this.productsFiltered = this.products.filter(p => p.category.id == value)
    }
  }

  detail(id: number) {
    const idProduct = id.toString()
    this.productService.getProduct(idProduct).subscribe((result: any) => {
      this.productDetail = result?.data.getProduct
    })
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe()
    this.productSubscription.unsubscribe()
  }
}