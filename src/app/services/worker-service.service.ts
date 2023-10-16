import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HouseholdChore } from '../common/household-chore';
import { Worker } from '../common/worker';

@Injectable({
  providedIn: 'root',
})
export class WorkerServiceService {
  baseUrl = 'https://localhost:5001/api/workers';

  constructor(private httpClient: HttpClient) {}

  getAllWorkers(): Observable<WorkerList> {
    return this.httpClient.get<WorkerList>(this.baseUrl);
  }

  getAllWorkersWithPagination(currentPage: number): Observable<WorkerList> {
    return this.httpClient.get<WorkerList>(
      this.baseUrl + '?page=' + currentPage
    );
  }

  getAllWorkersWithPaginationFromAdmin(
    currentPage: number
  ): Observable<WorkerList> {
    return this.httpClient.get<WorkerList>(
      this.baseUrl + '/admin?page=' + currentPage
    );
  }

  getWorkerWithKeyword(keyword: string, page: number): Observable<WorkerList> {
    return this.httpClient.get<WorkerList>(
      this.baseUrl + '/search?keyword=' + keyword + '&page=' + page
    );
  }
  getWorkerWithKeywordFromAdmin(
    keyword: string,
    page: number
  ): Observable<WorkerList> {
    return this.httpClient.get<WorkerList>(
      this.baseUrl + '/admin/search?keyword=' + keyword + '&page=' + page
    );
  }

  getWorkerDetail(id: number): Observable<Worker> {
    return this.httpClient.get<Worker>(this.baseUrl + '/' + id);
  }

  hireWorkerWithData(data: any) {
    let url = 'https://localhost:5001/api/orderhistory/hire';

    return this.httpClient.post(url, data);
  }

  updateWorkerStatus(data: any) {
    let url = this.baseUrl + '/admin/status';

    return this.httpClient.post(url, data);
  }

  updateWorkerData(data: any) {
    let url = this.baseUrl + '/admin/update';

    return this.httpClient.put(url, data);
  }
}

interface WorkerList {
  list: Worker[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
}
