import { Component } from '@angular/core';
import { Header } from './header/header';
import { Profile } from './profile/profile';
@Component({
  selector: 'app-dashboard',
  imports: [Header, Profile],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
