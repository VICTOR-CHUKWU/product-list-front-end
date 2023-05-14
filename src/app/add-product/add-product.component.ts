import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { take } from 'rxjs';
import { DefaultResponse, Product } from '../shared/interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  isEditMode: boolean = false;
  product: Product | null = null;
  product_id: string = '';

  appForm = this.fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    type: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    public productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.product_id = params.get('product_id') as string;

      if (this.product_id) {
        this.isEditMode = true;
        this.productService
          .getProduct(this.product_id)
          .subscribe((res) => {
            this.product = res
            const { name, type, location, description, price } = this.product
            this.appForm.setValue({
              name,
              type,
              location,
              description,
              price
            });
          });
      }
    });
  }


  createProduct(form: FormGroup, formDirective: FormGroupDirective) {
    const user = JSON.parse(localStorage.getItem('openAiUser') as string)
    if (!this.isEditMode) {
      this.productService
        .createProduct({
          ...form.value,
          user_id: user?._id || ''
        })
        .pipe(take(1))
        .subscribe((res: any) => {
          if (res.success) {
            form.reset();
            formDirective.resetForm();
            this.toast.success(res.message);
          } else {
            this.toast.error(
              res.message || 'Please try again',
              'An error occurred'
            );
          }
        });
    } else {
      this.productService
        .editProduct({
          ...this.product,
          ...form.value,
        })
        .pipe(take(1))
        .subscribe((res: any) => {
          if (res.success) {
            form.reset();
            formDirective.resetForm();
            this.toast.success(res.message);
            this.router.navigate(['/', this.product_id]);
          } else {
            this.toast.error(
              res.message || 'Please try again',
              'An error occurred'
            );
          }
        });
    }
  }
}
