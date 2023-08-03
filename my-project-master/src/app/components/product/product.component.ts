import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product, Category } from 'src/app/interfaces/Category';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: any = {};

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router
  ) {}

  addToCart(product: Product): void {
    const existingProduct = this.cartService.getProductById(product.id);

    if (existingProduct) {
      // If the product already exists in the cart, increase its quantity
      existingProduct.quantity++;
    } else {
      // If the product does not exist in the cart, add it to the cart
      this.cartService.addToCart(product);
    }

    window.alert('Prodotto aggiunto al carrello!');
  }

  ngOnInit(): void {}

  goToProductDetail(product: Product): void {
    // Store the selected product in local storage to pass it to the product detail page
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    // Navigate to the product detail page
    this.router.navigateByUrl('/product-details');
  }
}
