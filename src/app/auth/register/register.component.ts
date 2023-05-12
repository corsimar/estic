import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          passwordStrengthValidator(),
        ],
      ],
      confirmPassword: [
        null,
        [Validators.required, this.passwordMatchValidator()],
      ],
      gender: [null, Validators.required],
    });
  }

  get email(): FormControl {
    return this.validateForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.validateForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.validateForm.get('confirmPassword') as FormControl;
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const passwordValid = this.password.value == value;

      return !passwordValid ? { passwordMatch: true } : null;
    };
  }

  passwordChange() {
    if (this.password.value == this.confirmPassword.value) {
      this.confirmPassword.setErrors(null);
      return;
    }
    this.confirmPassword.setErrors({ incorrect: true });
  }

  goHome() {
    this.router.navigate(['/app/index']);
  }

  goToSignUp() {
    this.router.navigate(['/auth/register']);
  }

  goToSignIn() {
    this.router.navigate(['/auth/login']);
  }

  validForm() {
    return this.validateForm.valid;
  }

  submitForm(): void {
    if (this.validateForm.invalid) return;

    const payload = {
      email: this.email.value,
      password: this.password.value,
    };

    this.authService.register(payload).subscribe({
      next: (response) => {
        console.log('Register successful!');
        window.localStorage['token'] = response.token;
        this.router.navigate(['/app/index']);
      },
      error: (response) => {
        console.log('Error!');
      },
    });

    /*this.authService.register(payload).subscribe({
      next: (response) => {
        console.log(response);
        window.localStorage['token'] = response.token;
        this.router.navigate(['/app/index']);
      },
      error: (err) => {
        console.log(err);
      },
    });*/
  }
}

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}
