import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  InputGroup, InputGroupModule } from 'primeng/inputgroup';

import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddon } from "primeng/inputgroupaddon";
import { Button } from "primeng/button";
import { HttpClient } from '@angular/common/http';
import { Login } from '../login.comp';
import { appConfig } from '../../app.config';
import { AppConfiguration } from '../../config/appConfig';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { SignUpResponse } from '../../model/response.model';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule, InputGroupModule, InputTextModule, InputGroupAddon, Button,InputTextModule,PasswordModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent implements OnInit {

  
  emailId : any;
  password : any;
  email: any;
  loginReq : Login | undefined;
  constructor(
    private http : HttpClient,
    private route : Router
  ){}

  ngOnInit(): void {
    
  }
  login(){
    this.loginReq = {
      emailId : this.emailId,
      password : this.password
    }

    
    this.http.post<SignUpResponse>(AppConfiguration.login,this.loginReq).subscribe({
      next:(success:SignUpResponse)=>{
        if(success.status){
          console.log("Login successful",success);
          alert("Login successful");
          this.route.navigate(['/header-dropdown']);
        }else{
          alert("Login Failed");
        }
        
      },error:(error:any)=>{
          alert("Login Failed");
      }
    })

  }
  signUp() {
    this.route.navigate(['sign-up']);
  } 
}
