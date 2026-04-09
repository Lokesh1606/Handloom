import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../common/alert-component/alert-component';
import * as CryptoJS from 'crypto-js';
import { ApiConfig } from '../../config/ApiConfig';
import { ApiCall } from '../../config/ApiCall';

@Component({
  selector: 'app-signup-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent, RouterLink],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.scss',
})
export class SignupComponent implements OnInit {
  signup!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required, Validators.minLength(3)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', Validators.required);
  
  alertVisible = false;
  alertMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiCall
  ) {}

  ngOnInit() {
    this.signup = this.fb.group(
      {
        email: this.email,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  showAlert(message: string) {
    this.alertMessage = message;
    this.alertVisible = true;
  }

  hideAlert() {
    this.alertVisible = false;
    this.alertMessage = '';
  }

  submit() {
    if (!this.signup.valid) {
      if (this.email.hasError('required')) {
        this.showAlert('Please enter your email address.');
      } else if (this.email.hasError('email')) {
        this.showAlert('Please enter a valid email address.');
      } else if (this.username.hasError('required')) {
        this.showAlert('Please enter a username.');
      } else if (this.username.hasError('minlength')) {
        this.showAlert('Username must be at least 3 characters.');
      } else if (this.password.hasError('required')) {
        this.showAlert('Please enter a password.');
      } else if (this.password.hasError('minlength')) {
        this.showAlert('Password must be at least 6 characters.');
      } else if (this.confirmPassword.hasError('required')) {
        this.showAlert('Please confirm your password.');
      } else if (this.signup.hasError('passwordMismatch')) {
        this.showAlert('Passwords do not match.');
      }
      return;
    }

    this.isLoading = true;
    this.email.disable();
    this.username.disable();
    this.password.disable();
    this.confirmPassword.disable();

    const hashedPassword = CryptoJS.SHA256(this.password.value!).toString();
    
    const signupData = {
      email: this.email.value!,
      username: this.username.value!,
      password: hashedPassword,
    };

    console.log('Signup data:', signupData);
    
    this.api.signup(signupData).subscribe({
      next: (response) => {
        if (response.message) {
          this.showAlert(response.message);
        }
        this.resetForm();
      },
      error: (error) => {
        const backendMessage = error?.error?.message || 'Signup failed. Please try again.';
        this.showAlert(backendMessage);
        this.enableFields();
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.signup.reset();
    this.isLoading = false;
    this.enableFields();
  }

  enableFields() {
    this.email.enable();
    this.username.enable();
    this.password.enable();
    this.confirmPassword.enable();
  }
}
