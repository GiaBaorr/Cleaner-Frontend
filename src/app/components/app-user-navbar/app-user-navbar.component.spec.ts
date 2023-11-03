import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserNavbarComponent } from './app-user-navbar.component';

describe('AppUserNavbarComponent', () => {
  let component: AppUserNavbarComponent;
  let fixture: ComponentFixture<AppUserNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppUserNavbarComponent]
    });
    fixture = TestBed.createComponent(AppUserNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
