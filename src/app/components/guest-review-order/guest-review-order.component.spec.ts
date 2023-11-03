import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestReviewOrderComponent } from './guest-review-order.component';

describe('GuestReviewOrderComponent', () => {
  let component: GuestReviewOrderComponent;
  let fixture: ComponentFixture<GuestReviewOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestReviewOrderComponent]
    });
    fixture = TestBed.createComponent(GuestReviewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
