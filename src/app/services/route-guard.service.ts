import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRole = route.data?.['expectedRole'];

    const token: any = localStorage.getItem('token');

    if (token == expectedRole) {
      return true;
    }

    return true;
    //return false;
  }
}
