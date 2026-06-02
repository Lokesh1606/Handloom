import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() cartClick = new EventEmitter<void>();

  constructor(
    private router: Router
  ) {}

  links = [
    { name: 'Home', path: '' },
    { name: 'Orders', path: '' },
    { name: 'Profile', path: '' },
    { name: 'My Cart', path: '' },
    { name: 'Logout', path: '' },
  ];

  handleLink(item: { name: string; path: string }) {
    if (item.name === 'My Cart') {
      this.cartClick.emit();
      return;
    }

    if (item.path) {
      this.router.navigate([item.path]);
    }
  }
}
