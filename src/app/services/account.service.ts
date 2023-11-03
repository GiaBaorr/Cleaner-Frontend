import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Account } from '../common/account';

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

  signup(data: any) {
    return this.httpClient.post(this.baseUrl + '/register', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getAccountForAdminWithPagination(currentPage: number) {
    let url = this.baseUrl + '/admin?page=' + currentPage;

    return this.httpClient.get<AccountList>(url);
  }

  getAccountForAdminWitKeyword(keyword: string, currentPage: number) {
    let url =
      this.baseUrl +
      '/admin/search?page=' +
      currentPage +
      '&keyword=' +
      keyword;

    return this.httpClient.get<AccountList>(url);
  }

  deleteAccountUserRole(id: number) {
    let url = this.baseUrl + '/admin/delete/' + id;
    return this.httpClient.delete(url);
  }

  adminAddAccount(data: any) {
    return this.httpClient.post(this.baseUrl + '/admin/add', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getUserAccountByToken() {
    let url = this.baseUrl + '/get_account';

    return this.httpClient.get<Account>(url);
  }
  updateAccountByUser(data: any) {
    return this.httpClient.put(this.baseUrl + '/update', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  changePasswordByUser(data: any) {
    return this.httpClient.post(this.baseUrl + '/change_password', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getOtpByUser(data: any) {
    let url = this.baseUrl + '/send_otp';
    return this.httpClient.post(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  changePasswordByUserWithOtp(data: any) {
    return this.httpClient.post(this.baseUrl + '/forgot_password', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  userEnrollWorker(data: any) {
    let url = this.baseUrl + '/user/add';

    return this.httpClient.post(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}

interface AccountList {
  list: Account[];

  currentPage: number;
  pageSize: number;
  totalElements: number;
}
