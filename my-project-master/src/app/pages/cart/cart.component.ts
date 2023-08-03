import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/interfaces/Category';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { orderDetails } from 'src/app/interfaces/checkout';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items: Product[] = [];
  textToCopy: string = 'NIRAYA20';
  totalPrice: number = 0;
  // Prezzo di spedizione
  shippingCost: number = 0;
  // IVA
  ivaRate: number = 22;
  // Codice sconto
  couponCode: string = '';
  couponApplied: boolean = false;
  showToast = false;


  //prezzo originale del carrello
  originalTotalPrice: number = 0;

  constructor(private cartService: CartService, private clipboard: Clipboard, private router: Router, private http: HttpClient) {
    this.items = this.cartService.getItems();
    this.calculateTotalPrice(); // Inizializza il totale generale del carrello
    this.originalTotalPrice = this.totalPrice; // Memorizza il prezzo originale
  }


  applyCoupon() {
    if (this.couponCode === 'NIRAYA20') {
      // Calcola il valore dello sconto
      const discountAmount = this.getTotalPrice() * 0.2;
      // Sottrai lo sconto dal totale
      this.totalPrice -= discountAmount;
      // Imposta il flag del coupon applicato a true
      this.couponApplied = true;
    }
  }

  clearCart() {
    this.cartService.clearCart();
    window.alert('Hai svuotato il carrello!');
    this.items = [];
    this.totalPrice = this.originalTotalPrice; // Ripristina il prezzo originale del carrello
  }

  getTotalPrice(): number {
    let total = 0;
    for (const item of this.items) {
      total += item.price * item.quantity; // Calcola il totale di ogni prodotto
    }
    return total;
  }

  removeProductFromCart(productId: number) {
    this.cartService.removeProduct(productId);
    this.items = this.cartService.getItems();
    this.calculateTotalPrice();
  }

  // Funzione per calcolare il totale generale
  calculateTotalPrice(): void {
    this.totalPrice = this.getTotalPrice();
  }

  incrementQuantity(item: Product): void {
    item.quantity++;
    this.calculateTotalPrice();
  }

  decrementQuantity(item: Product): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotalPrice();
    }
  }

  copyToClipboard() {
    const textToCopy = 'NIRAYA20';
    this.copyTextToClipboard(textToCopy);
    this.showToast = true;
    setTimeout(() => this.showToast = false, 2000); // Nascondi la notifica dopo 2 secondi
  }

  copyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  closeToast() {
    this.showToast = false;
  }

  goToCheckout() {
    const cartItems = this.cartService.getItems();
    const totalPrice = this.getTotalPrice(); // Assicurati di avere questa funzione nel tuo componente cart
    this.router.navigate(['/checkout'], { queryParams: { cartItems: JSON.stringify(cartItems), totalPrice } });
  }

}
