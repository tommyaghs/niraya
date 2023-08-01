import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from 'src/app/interfaces/Category';
import { Category } from 'src/app/interfaces/Category';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  @Input()
  public numbers: any = [];
  categories: Category[] = [];
  products: Product[] = [];
  filterProductList: Product[] = [];
  sortingForm: FormGroup = this.formBuilder.group({ sortingCriteria: ['default'] });
  selectedSorting: string = 'default';

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {} // Inietta il Common Service nel costruttore

  ngOnInit() {

    this.getAllProductsFromApiService();
    this.sortingForm.valueChanges.subscribe(() =>{
      this.sortProducts()
    })
  }

  private getAllProductsFromApiService(): void {
    this.apiService.getCategory().subscribe((categories: any) => {
      this.categories = categories;
      console.log(this.categories);

      this.loadProducts();
    });
  }

  loadProducts() {

    this.apiService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filterProductList = data;
      this.sortProducts();
    });
  }

  sortProducts() {
    const selectedSorting = this.sortingForm.get('sortingCriteria')?.value;
    switch (selectedSorting) {
      case 'default':
        // Mantieni ordine originale prodotti
        this.filterProductList = this.products;
        break;
      case 'title_asc':
        // Ordina dalla A alla Z
        this.filterProductList = this.products.slice().sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price_asc':
        // Ordina prezzo crescente
        this.filterProductList = this.products.slice().sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        // Ordina prezzo decrescente
        this.filterProductList = this.products.slice().sort((a, b) => b.price - a.price);
        break;
    }
  }

}
