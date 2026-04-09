import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginSubmit } from '../../model/login';
import { ApiConfig } from '../../config/ApiConfig';
import { ApiCall } from '../../config/ApiCall';
import { AlertComponent } from '../../common/alert-component/alert-component';
const KEY = '1234567812345678';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent, RouterLink],
  providers: [ApiCall],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent implements OnInit{
  
  login!: FormGroup;
  emailid = new FormControl('', [Validators.required, Validators.email]) ;
  password =new FormControl('', Validators.required)
  loginSubmit : LoginSubmit;
  apiConfig : ApiConfig | undefined;
  alertVisible = false;
  alertMessage = '';
  isLoading = false;

  constructor(
    private fb : FormBuilder,
    private api : ApiCall
  ){
    this.loginSubmit = new LoginSubmit();
  }

  ngOnInit(){
    this.login = this.fb.group({
      emailid : this.emailid,
      password : this.password
    });
  }

  showAlert(message: string) {
    this.alertMessage = message;
    this.alertVisible = true;
  }

  hideAlert() {
    this.alertVisible = false;
    this.alertMessage = '';
  }

  submit(){
    if (!this.login.valid) {
      if (this.emailid.hasError('required')) {
        this.showAlert('Please enter your email address.');
      } else if (this.emailid.hasError('email')) {
        this.showAlert('Please enter a valid email address.');
      } else if (this.password.hasError('required')) {
        this.showAlert('Please enter your password.');
      }
      return;
    }

    this.isLoading = true;
    console.log(this.login.valid);
    this.emailid.disable();
    this.password.disable();
    this.loginSubmit.email = this.emailid.value!;
    
    // Hash password before sending (SHA-256)


    const hashedPassword = encrypt(this.password);
    this.loginSubmit.password = hashedPassword;
    this.api.loginSubmit(this.loginSubmit).subscribe({
      next: (response) => {
        console.log(response);
        if(response.message)
          this.showAlert(response.message)
        
        // Assuming response has { token: 'jwt-token' }
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          // Navigate to dashboard or home
          // this.router.navigate(['/dashboard']);
        }
        this.isLoading = false;
        this.emailid.enable();
        this.password.enable();
      },
      error : (error) => {
        console.log(error);
        const backendMessage = error?.error?.message || 'Login failed. Please check your credentials and try again.';
        this.showAlert(backendMessage);
        this.isLoading = false;
        this.emailid.enable();
        this.password.enable();
      }
    });
  }

}
function encrypt(passwordControl: FormControl<string | null>) : string{

  const key = CryptoJS.enc.Utf8.parse(KEY);
  const encrypted = CryptoJS.AES.encrypt(passwordControl.value!, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

