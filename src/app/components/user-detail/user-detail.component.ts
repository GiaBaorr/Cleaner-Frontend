import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let decodeToken: any = jwtDecode(token!);
    let role = decodeToken.role;

    if (role == 'user') {
      this.router.navigate(['/user/account']);
    } else if (role == 'worker') {
      this.router.navigate(['/worker/account']);
    } else {
      this.router.navigate(['']);
    }
  }
}
