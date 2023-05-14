import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { Product } from '../interface';

import { handleError } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(
        private httpClient: HttpClient,
        @Inject('baseUrl') private baseUrl: string
    ) { }

    // view an Appointment detail
    getAllProducts() {
        return this.httpClient
            .get<{ success: boolean; products: Product[] }>(
                this.baseUrl + `/products`
            )
            .pipe(
                map((res) => res.products),
                catchError(handleError)
            );
    }

    getProduct(id: string) {
        console.log(id, 'id service');

        return this.httpClient
            .get<{ success: boolean; product: Product }>(
                this.baseUrl + `/products/${id}`
            )
            .pipe(
                map((res) => res.product),
                catchError(handleError)
            );
    }

    createProduct(product: Product) {
        return this.httpClient
            .post(this.baseUrl + `/products`, {
                ...product,
            })
            .pipe(catchError(handleError));
    }

    editProduct(product: Product) {
        return this.httpClient
            .patch(this.baseUrl + `/products/${product._id}`, {
                ...product,
            })
            .pipe(catchError(handleError));
    }

    deleteProduct(id: string) {
        return this.httpClient
            .delete(`${this.baseUrl}/products/${id}`)
            .pipe(catchError(handleError));
    }
}
