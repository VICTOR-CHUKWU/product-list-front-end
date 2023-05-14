import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { UserCred } from '../interface';

import { handleError } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private httpClient: HttpClient,
        @Inject('baseUrl') private baseUrl: string
    ) { }

    // view an Appointment detail
    LoginUser({ email, password }: { email: string, password: string }) {
        return this.httpClient
            .post(
                this.baseUrl + `/products/user/login`, {
                email,
                password
            }
            )
            .pipe(
                catchError(handleError)
            );
    }



    RegisterUser(user: UserCred) {
        return this.httpClient
            .post(this.baseUrl + `/products/user`, {
                ...user,
            })
            .pipe(catchError(handleError));
    }

}
