import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrollComponent } from './user-enroll.component';

describe('UserEnrollComponent', () => {
  let component: UserEnrollComponent;
  let fixture: ComponentFixture<UserEnrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEnrollComponent]
    });
    fixture = TestBed.createComponent(UserEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
