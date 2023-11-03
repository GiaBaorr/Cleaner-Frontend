import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-app-user-navbar',
  templateUrl: './app-user-navbar.component.html',
  styleUrls: ['./app-user-navbar.component.scss'],
})
export class AppUserNavbarComponent implements OnInit {
  role?: string;
  title?: string;

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let decodeToken: any = jwtDecode(token!);

    this.role = decodeToken.role;
    if (this.role === 'worker') {
      this.title = 'Worker';
    } else if (this.role === 'user') {
      this.title = 'User';
    }
  }
}
