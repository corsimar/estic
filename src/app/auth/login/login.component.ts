import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordStrengthValidator } from '../register/register.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      remember: [null],
    });
  }

  get email(): FormControl {
    return this.validateForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.validateForm.get('password') as FormControl;
  }

  get remember(): FormControl {
    return this.validateForm.get('remember') as FormControl;
  }

  validForm() {
    return this.validateForm.valid;
  }

  goToSignUp() {
    this.router.navigate(['/auth/register']);
  }

  submitForm(): void {
    if (this.validateForm.invalid) return;

    const payload = {
      email: this.email.value,
      password: this.password.value,
    };

    this.authService.login(payload).subscribe({
      next: (response) => {
        const resp = JSON.parse(response);
        if (this.remember.value == true) {
          window.localStorage['rememberMe'] = true;
        }
        window.localStorage['token'] = resp.token;
        window.localStorage['userId'] = resp.userId;
        window.sessionStorage['session'] = true;
        window.sessionStorage.setItem('refresh', 'true');
        this.router.navigate(['/app/index']);
      },
      error: (response) => {
        this.error = response.error;
      },
    });
  }
}
