import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringWorkerComponent } from './hiring-worker.component';

describe('HiringWorkerComponent', () => {
  let component: HiringWorkerComponent;
  let fixture: ComponentFixture<HiringWorkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiringWorkerComponent]
    });
    fixture = TestBed.createComponent(HiringWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
