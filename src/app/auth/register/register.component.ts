import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toast: ToastrService,
    private userAPi: AuthService
  ) { }

  regForm = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required],
  });
  passwordIsVisible = false;
  returnUrl: string = '';
  isLoading = false;


  register() {
    const { email: _email, password: _password, name: _name } = this.regForm.value;
    let email = '';
    let password = '';
    let name = ''
    if (_email && _password && _name) {
      email = _email.trim();
      password = _password.trim();
      name = _name
    }

    this.isLoading = true;
    (document.activeElement as HTMLElement).blur();
    localStorage.setItem('userEmail', email);
    this.userAPi
      .RegisterUser({ email, password, name })
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
