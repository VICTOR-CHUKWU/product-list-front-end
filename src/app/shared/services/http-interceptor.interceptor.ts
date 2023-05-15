import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];


  constructor(private router: Router, private toast: ToastrService,) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    this.requests.push(request);
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Handle successful responses
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized error (status code 401)
          this.toast.error(error.message || 'you are not logged in');
          this.logout(); // Call the logout function
        }
        return throwError(error);
      })
    );
  }

  logout() {
    // Implement your logout logic here
    // For example, remove the token from local storage and navigate to the login page
    localStorage.removeItem('token');
    localStorage.removeItem('openFabricUser');
    this.router.navigate(['/register']);
  }

}

