import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = 'https://localhost:5001/api/Account';
  isLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    return this.httpClient.post(this.baseUrl + '/login', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
