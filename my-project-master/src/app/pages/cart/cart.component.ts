import { Component, } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product, Category } from 'src/app/interfaces/Category';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  categories: Category[] = [];
  products: Product[] = [];
  items = this.cartService.getItems();
  constructor(public cartService: CartService) { }

  clearCart() {
    this.cartService.clearCart();
    window.alert('hai svuotato il carrello!');
  }

  ngOnInit() {
  }


}
