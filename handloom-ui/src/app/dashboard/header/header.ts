import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(
    private router: Router
  ) {}

  links = [
    { name: 'Home', path: '' },
    { name: 'Orders', path: '' },
    { name: 'Profile', path: '' },
    { name: 'Logout', path: '' }
  ];

}
