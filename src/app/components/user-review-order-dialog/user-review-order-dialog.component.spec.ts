import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReviewOrderDialogComponent } from './user-review-order-dialog.component';

describe('UserReviewOrderDialogComponent', () => {
  let component: UserReviewOrderDialogComponent;
  let fixture: ComponentFixture<UserReviewOrderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReviewOrderDialogComponent]
    });
    fixture = TestBed.createComponent(UserReviewOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
