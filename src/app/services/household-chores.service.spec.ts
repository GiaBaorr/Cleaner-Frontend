import { TestBed } from '@angular/core/testing';

import { HouseholdChoresService } from './household-chores.service';

describe('HouseholdChoresService', () => {
  let service: HouseholdChoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseholdChoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
