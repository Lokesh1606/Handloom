import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Header } from './header/header';
import { Profile } from './profile/profile';
import { Main } from "./main/main";
import { Mycard } from '../cart/mycard/mycard';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf, Header, Profile, Main, Mycard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected showCart = false;

  openCart() {
    this.showCart = true;
  }

  closeCart() {
    this.showCart = false;
  }
}
