import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component/dashboard.component';
import { SignupComponent } from './login/signup-component/signup-component';
import { LoginComponent } from './login/login-component/login-component';

export const routes: Routes = [
    {path : '', component:DashboardComponent},
    {path:'login', component:LoginComponent},
    {path:'sign-up',component:SignupComponent}
];
