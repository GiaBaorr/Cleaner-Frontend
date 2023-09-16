import { TestBed } from '@angular/core/testing';

import { WorkerServiceService } from './worker-service.service';

describe('WorkerServiceService', () => {
  let service: WorkerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
