import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cartItems';
  items: Product[] = [];
  itemCount: number = 0;

  constructor() {
    // Load cart items from local storage on service initialization
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.itemCount = this.items.length;
    }
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.itemCount = this.items.length;
    this.saveToLocalStorage();
  }

  removeProductFromCart(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
    this.itemCount = this.items.length;
    this.saveToLocalStorage();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.itemCount = 0;
    this.saveToLocalStorage();
    return this.items;
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
}
