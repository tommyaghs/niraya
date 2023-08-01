import { CartComponent } from './../../pages/cart/cart.component';
import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Category, Product } from 'src/app/interfaces/Category';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  categories: Category[] = [];
  products: Product[] = [];
  items = this.cartService.getItems();
  constructor(private CartComponent: CartComponent, public cartService: CartService) {}


  removeProductFromCart (productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
}

}
