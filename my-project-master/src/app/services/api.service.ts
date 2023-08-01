import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/Category';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  // Ottieni tutti i prodotti - Aggiornato il nome della funzione a getProducts
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  // Ottieni un singolo prodotto per ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${productId}`);
  }

  // Ottieni tutte le categorie
  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }
}
