import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { orderDetails } from '../interfaces/checkout'; // Assumi che il modello dell'ordine sia definito

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private apiUrl = '/express/create-order';// Imposta la base URL del server (potrebbe essere differente da /api)

  constructor(private http: HttpClient) { }

  createOrder(orderDetails: orderDetails): Observable<any> {
    // Effettua la richiesta HTTP POST verso l'endpoint del server per creare un nuovo ordine
    return this.http.post<any>(this.apiUrl, orderDetails);
  }
}
