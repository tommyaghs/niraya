import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Category';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct: Product | null = null;
  isImageExpanded: boolean = false;
  selectedImageIndex: number = 2;

  ngOnInit() {
    const product = localStorage.getItem('selectedProduct');
    this.selectedProduct = product ? JSON.parse(product) : null;
  }


  // Funzione per impostare l'immagine selezionata nell'area ingrandita
  setSelectedImage(index: number): void {
    this.selectedImageIndex = index;
  }

  // Funzione per ingrandire/ridurre l'immagine
  toggleImageSize(): void {
    this.isImageExpanded = !this.isImageExpanded;
  }
}
