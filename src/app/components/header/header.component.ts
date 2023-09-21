import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorkerServiceService } from 'src/app/services/worker-service.service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userId: number = null!;

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private accountService: AccountService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    this.accountService.isLoggedIn.subscribe((state) => {
      this.isLoggedIn = state;
      this.applyUserInfo();
    });

    this.applyUserInfo();
  }

  applyUserInfo() {
    if (this.isLoggedIn) {
      const token: any = localStorage.getItem('token');
      var tokenPayload: any = jwt_decode(token);
      this.userId = tokenPayload.userId;
      if (tokenPayload.role == 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }
  }

  onOpenLogin() {
    const matConfig = new MatDialogConfig();
    matConfig.width = '550px';
    this.matDialog.open(LoginComponent, matConfig);
  }

  onOpenSignUp() {
    const matConfig = new MatDialogConfig();
    matConfig.width = '550px';
    this.matDialog.open(SignupComponent, matConfig);
  }

  onOpenProfile() {
    if (this.isAdmin) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  }

  onLogOut() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.toast.success('Logged out successfully');
    this.router.navigate(['']);
  }
}

//check token -> neu' co' lấy tên -> log out và admin/info
