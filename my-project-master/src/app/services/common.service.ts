import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLogged = new Subject<boolean>();
  constructor(private http: HttpClient) {
    this.isLogged.next(false);
  }

  login(): Observable<any> {
    const url = '/api/login';
    return this.http.get<any>(url);
  }
}

