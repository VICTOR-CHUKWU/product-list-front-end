import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toast: ToastrService,
    private userAPi: AuthService
  ) { }
  loginForm = this.fb.group({
    email: [
      localStorage.getItem('userEmail') !== 'null'
        ? localStorage.getItem('userEmail')
        : '',
      [Validators.required],
    ],
    password: ['', Validators.required],
  });
  passwordIsVisible = false;
  returnUrl = '';
  isLoading = false;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  login() {
    const { email: _email, password: _password } = this.loginForm.value;
    let email = '';
    let password = '';
    if (_email && _password) {
      email = _email.trim();
      password = _password.trim();
    }

    this.isLoading = true;
    (document.activeElement as HTMLElement).blur();
    localStorage.setItem('userEmail', email);
    this.userAPi
      .LoginUser({ email, password })
      .pipe(take(1))
      .subscribe(
        (r: any) => {
          this.isLoading = false;

          if (r.success) {
            localStorage.setItem('token', r.token);
            localStorage.setItem('openFabricUser', JSON.stringify(r.user));
            this.toast.success(r.message);
            this.router.navigate(['/'])
          }

          return
        }
        // () => (this.isLoading = false)
      );
  }
}
