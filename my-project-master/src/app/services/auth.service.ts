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

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // salvare il token nel localStorage o nei cookie
  saveToken(token: string): void {
    localStorage.setItem('token', token);

  }

  // ottenere il token salvato nel client
  getToken(): string | null {
    return localStorage.getItem('token');

  }

  // verificare se l'utente è autenticato
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // effettuare il logout e rimuovere il token dal client
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/dashboard']);
}
}
