import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/express';

  constructor(private http: HttpClient, private router: Router) { }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email/${email}`);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Metodo per il login e ottenere il token
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Metodo per salvare il token nel localStorage o nei cookie
  saveToken(token: string): void {
    localStorage.setItem('token', token);

  }

  // Metodo per ottenere il token salvato nel client
  getToken(): string | null {
    return localStorage.getItem('token');

  }

  // Metodo per verificare se l'utente è autenticato
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Restituisce true se il token esiste, altrimenti false
  }

  // Metodo per effettuare il logout e rimuovere il token dal client
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/dashboard']);
}
}
