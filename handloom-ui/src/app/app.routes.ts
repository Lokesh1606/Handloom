import { Routes } from '@angular/router';
import { LoginComponent } from './login/login-component/login-component';

export const routes: Routes = [
    // {path : '', component:LoginComponent},
    {path : 'login', component:LoginComponent},
    {path : 'signup', loadComponent: () => import('./login/signup-component/signup-component').then(m => m.SignupComponent)},
    {path : '', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)},
    {path : 'cart', loadComponent: () => import('./cart/mycard/mycard').then(m => m.Mycard)}
];
