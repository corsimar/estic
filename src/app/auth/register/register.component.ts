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
  error: string;

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
      lastName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.nameValidator(),
        ],
      ],
      firstName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.nameValidator(),
        ],
      ],
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

  get lastName(): FormControl {
    return this.validateForm.get('lastName') as FormControl;
  }

  get firstName(): FormControl {
    return this.validateForm.get('firstName') as FormControl;
  }

  get password(): FormControl {
    return this.validateForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.validateForm.get('confirmPassword') as FormControl;
  }

  get gender(): FormControl {
    return this.validateForm.get('gender') as FormControl;
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

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasOnlyLetters = /^[a-zA-Z\s-]+$/.test(value);

      const nameValid = hasOnlyLetters;

      return !nameValid ? { nameValid: true } : null;
    };
  }

  passwordChange() {
    if (this.password.value == this.confirmPassword.value) {
      this.confirmPassword.setErrors(null);
      return;
    }
    this.confirmPassword.setErrors({ incorrect: true });
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
      lastName: this.lastName.value,
      firstName: this.firstName.value,
      password: this.password.value,
      gender: this.gender.value,
    };

    this.authService.register(payload).subscribe({
      next: (response) => {
        const resp = JSON.parse(response);
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
