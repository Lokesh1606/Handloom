import { Component } from '@angular/core';
import { Header } from './header/header';
import { Main } from "./main/main";
import { Mycard } from '../cart/mycard/mycard';

@Component({
  selector: 'app-dashboard',
  imports: [ Header, Main, Mycard],
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
