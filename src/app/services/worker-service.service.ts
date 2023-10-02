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

  getWorkerWithKeyword(keyword: string, page: number): Observable<WorkerList> {
    return this.httpClient.get<WorkerList>(
      this.baseUrl + '/search?keyword=' + keyword + '&page=' + page
    );
  }

  getWorkerDetail(id: number): Observable<Worker> {
    return this.httpClient.get<Worker>(this.baseUrl + '/' + id);
  }
}

interface WorkerList {
  workers: Worker[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
}
