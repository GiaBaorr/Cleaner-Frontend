import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkerServiceService {
  baseUrl = 'https://localhost:5001/api/workers';

  constructor(private httpClient: HttpClient) {}

  getAllWorkers(): Observable<WorkerList> {
    return this.httpClient.get<WorkerList>(this.baseUrl);
  }
}

interface WorkerList {
  accounts: Worker[];
  currentPage: number;
  pages: number;
  elements: number;
}
