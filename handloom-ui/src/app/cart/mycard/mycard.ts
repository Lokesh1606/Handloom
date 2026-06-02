import { Component, Signal, signal } from '@angular/core';
import { CartItems } from '../../model/cartitems';
import { Items } from '../items/items';

@Component({
  selector: 'app-mycard',
  standalone: true,
  imports: [Items],
  templateUrl: './mycard.html',
  styleUrls: ['./mycard.scss'],
})
export class Mycard {

  cartItems : any[] = CartItems;

  constructor () { 
    console.log("cartItems: "+JSON.stringify(this.cartItems));
  }  
}
