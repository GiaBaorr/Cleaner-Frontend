import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRole: string[] = route.data?.['expectedRole'];
    let valid = false;

    const token: any = localStorage.getItem('token');
    if (!token) {
      valid = false;
    } else {
      var tokenPayload: any = jwt_decode(token);

      for (let i = 0; i < expectedRole.length; i++) {
        if (tokenPayload.role === expectedRole[i]) {
          valid = true;
        }
      }
    }

    if (!valid) {
      this.router.navigate(['/workers']);
    }
    return true;
  }
}
