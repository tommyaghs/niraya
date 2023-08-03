import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cartItems';
  items: Product[] = [];
  itemCount: number = 0;

  constructor() {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.itemCount = this.items.length;
    }
  }



  addToCart(product: Product): void {
    const existingProduct = this.getProductById(product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  getProductById(productId: number): Product | undefined {
    return this.items.find(item => item.id === productId);
  }

  removeProduct(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage() {
    const cartJSON = JSON.stringify(this.items);
    localStorage.setItem(this.storageKey, cartJSON);
  }

  private loadCartFromLocalStorage() {
    const cartJSON = localStorage.getItem(this.storageKey);
    if (cartJSON) {
      this.items = JSON.parse(cartJSON);
    } else {
      this.items = [];
    }
  }

  getItems() {
    return this.items;
  }

  clearCart(): Product[] {
    this.items = [];
    this.saveCartToLocalStorage();
    return this.items;
  }

}
