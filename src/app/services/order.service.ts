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

  // https://localhost:5001/api/workers/orderhistories
  getOrderHistoryFromWorker() {
    let url = 'https://localhost:5001/api/workers/orderhistories';
    return this.httpClient.get<Order[]>(url);
  }

  getOrderHistoryFromWUser() {
    let url = 'https://localhost:5001/api/account/orderhistories';
    return this.httpClient.get<Order[]>(url);
  }

  userReviewOrder(data: any) {
    let url = this.baseUrl + '/review';
    return this.httpClient.post(url, data);
  }

  getOrderByOrderId(orderId: number) {
    let url = this.baseUrl + '/' + orderId;
    return this.httpClient.get<Order>(url);
  }
}

interface OrderHistoryList {
  list: Order[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
}
