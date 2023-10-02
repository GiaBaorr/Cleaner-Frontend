import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkerComponent } from './admin-worker.component';

describe('AdminWorkerComponent', () => {
  let component: AdminWorkerComponent;
  let fixture: ComponentFixture<AdminWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminWorkerComponent]
    });
    fixture = TestBed.createComponent(AdminWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
