import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkerServiceService {
  baseUrl = 'http://localhost:5001/api/workers';

  constructor(private httpClient: HttpClient) {}

  getAllWorkers(): Observable<Worker[]> {
    return this.httpClient.get<Worker[]>(this.baseUrl);
  }
}
