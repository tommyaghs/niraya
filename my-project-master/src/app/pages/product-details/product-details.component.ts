import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/Category';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: any = {};
  selectedProduct: Product | null = null;
  isImageExpanded: boolean = false;
  selectedImageIndex: number = 2;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    const product = localStorage.getItem('selectedProduct');
    this.selectedProduct = product ? JSON.parse(product) : null;
  }

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

  // Funzione per impostare l'immagine selezionata nell'area ingrandita
  setSelectedImage(index: number): void {
    this.selectedImageIndex = index;
  }

  // Funzione per ingrandire/ridurre l'immagine
  toggleImageSize(): void {
    this.isImageExpanded = !this.isImageExpanded;
  }
  goToProductDetail(product: Product): void {
    // Store the selected product in local storage to pass it to the product detail page
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    // Navigate to the product detail page
    this.router.navigateByUrl('/product-details');
  }
}
