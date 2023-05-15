import { Component } from '@angular/core';
import { Product } from '../shared/interface';

import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: Product[] = []
  loading = true;

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe(
        (res) => {
          this.products = res
          this.loading = false
        }),
      () => (this.loading = false);

  }
}
