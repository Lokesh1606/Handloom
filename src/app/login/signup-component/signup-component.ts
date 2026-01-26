import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroup, InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddon } from "primeng/inputgroupaddon";
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from '../../config/appConfig';
import { SignUpResponse } from '../../model/response.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-component',
  imports: [InputGroup,
    InputGroupAddon, FormsModule,
    CommonModule, ButtonModule,
    InputGroupModule, InputTextModule,
    InputMaskModule, PasswordModule,
    ReactiveFormsModule],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.scss',
  providers: []
})
export class SignupComponent implements OnInit {
  firstName = new FormControl('Lokesh', Validators.required);
  lastName = new FormControl('', Validators.required);
  emailAddress = new FormControl('bandalokesh22@gmail.com', Validators.required);
  phoneNumber = new FormControl('9652212716', Validators.required);
  password = new FormControl('Lokesh@2108', Validators.required);

  form = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    emailAddress: this.emailAddress,
    phoneNumber: this.phoneNumber,
    password: this.password
  });

  constructor(
    private http : HttpClient,
    private route : Router
  ){}

  
  ngOnInit(): void {
    
  }


  submit(){
    
    console.log(this.form.value);
    this.http.post<SignUpResponse>(AppConfiguration.signUp,this.form.value).subscribe({

      next:(response:SignUpResponse )=>{
        if(response == null){
          alert("Signup failed! Please try again.");
          return;
        }else if(response.status == false){
          alert("User is already signup with the Email Id " + this.form.value.emailAddress);
        }else if(response.status == true){
          alert("User signup is successful. Please proceed to login.");
          this.form.reset();
          this.route.navigate(['/login']);
        }
       

      },error:(error:any)=>{
        console.error("Error during signup:", error);
        alert("User is already signed up with the Email Id " + this.form.value.emailAddress);
        this.form.reset();
      }
    });

  }

}
