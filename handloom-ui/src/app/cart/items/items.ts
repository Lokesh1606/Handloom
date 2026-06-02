import { Component, input, InputSignal, Signal } from '@angular/core';
import { CartItemsModel } from '../../model/CartItemModel';

@Component({
  selector: 'app-items',
  standalone: true,
  templateUrl: './items.html',
  styleUrls: ['./items.scss'],
})
export class Items {
  item = input.required<CartItemsModel>();

  constructor() {
    setTimeout(() => {
      console.log('item: ' + JSON.stringify(this.item));
    }, 10000);
  }
}
