import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductI } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: string
  BASE_URL: string
  product: ProductI

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    ) {
      this.product = {
        id: 0,
        name: '',
        price: 0,
        stock: 0
      }
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.BASE_URL = 'http://localhost:3000/img/'
      this.productService.getProduct(this.id).subscribe((result: any) => {
        this.product = result?.data.getProduct
      })
    })
  }

}
