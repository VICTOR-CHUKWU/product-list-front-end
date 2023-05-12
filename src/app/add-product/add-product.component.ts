import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../shared/services/product.service';
import { take } from 'rxjs';
import { DefaultResponse } from '../shared/interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
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
    public productService: ProductService
  ) { }

  createProduct(form: FormGroup, formDirective: FormGroupDirective) {
    console.log(form, 'forms');
    this.productService
      .createProduct(
        {
          ...form.value,
        }
      )
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          if (res.success) {
            form.reset();
            formDirective.resetForm();
            this.toast.success(res.message);
          } else {
            this.toast.error(res.message || 'Please try again', 'An error occurred');
          }
        }

      );
  }

}
