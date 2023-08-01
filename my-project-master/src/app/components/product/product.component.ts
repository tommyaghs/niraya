import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product, Category  } from 'src/app/interfaces/Category';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  selectedProduct: any
  @Input() product:any;
  constructor(private ApiService: ApiService, private cartService: CartService, private router: Router) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Prodotto aggiunto al carrello!');
  }

  ngOnInit() {

  }

  goToProductDetail(product: Product) {
    // Store the selected product in local storage to pass it to the product detail page
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    // Navigate to the product detail page
    this.router.navigateByUrl('/product-details');
  }
}
