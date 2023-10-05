import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'https://localhost:5001/api/OrderHistory';

  constructor(private httpClient: HttpClient) {}

  getOrderHistory(currentPage: number): Observable<OrderHistoryList> {
    return this.httpClient.get<OrderHistoryList>(
      this.baseUrl + '?page=' + currentPage
    );
  }

  getOrderHistoryWithKeyword(
    keyword: string,
    currentPage: number
  ): Observable<OrderHistoryList> {
    return this.httpClient.get<OrderHistoryList>(
      this.baseUrl + '/search?keyword=' + keyword + '&page=' + currentPage
    );
  }
}

interface OrderHistoryList {
  orderHistories: Order[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
}
