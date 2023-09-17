import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HouseholdChore } from '../common/household-chore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HouseholdChoresService {
  choresUrl: string = 'https://localhost:5001/api/householdchores';

  constructor(private httpClient: HttpClient) {}

  getAllChores(): Observable<HouseholdChore[]> {
    return this.httpClient.get<HouseholdChore[]>(this.choresUrl);
  }
}
