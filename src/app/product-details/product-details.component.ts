import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, User } from '../shared/interface';
import { ProductService } from '../shared/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  product_id: string = ''
  product: Product | null = null;
  User: User | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public productService: ProductService,
    private router: Router,
    private toast: ToastrService,

  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.product_id = params.get('product_id') as string;

    });
  }

  ngOnInit(): void {
    this.productService
      .getProduct(this.product_id)
      .subscribe((res) => this.product = res);

    const user = JSON.parse(localStorage.getItem('openFabricUser') as string)
    this.User = user
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product_id).subscribe((r: any) => {
      if (r.success) {
        this.toast.success(r.message);
        this.router.navigateByUrl('/');
        return;
      } else {
        this.toast.error(
          `Could not delete product: "${this.product_id}"`);
      }

    }),
      () => (this.toast.error('could not delete Product'))
  }

}
