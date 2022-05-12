import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormsModule, FormGroup } from '@angular/forms';

import { Prod } from '../models/prod';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Prod[] = [];

  subject = new Subject<number>();
  counter = 0;

  constructor() {}

  addToCart(x: Prod) {
    this.items.push(x);
  }
  getItems() {
    return this.items;
  }

  conta() {
    this.counter++;
    this.subject.next(this.counter);
  }

  clearCart() {
    this.items.length = 0;
    this.counter = 0;
    this.subject.next(this.counter);
  }
}
