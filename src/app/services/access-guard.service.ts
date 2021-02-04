import { Component, Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/user/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot): Observable <boolean>|Promise<boolean>|boolean {
    const requiresLogin = route.data.requiresLogin || false;
    if (requiresLogin) {
      // Check that the user is logged in...
      return true;
    }
  }

  constructor(private router: Router) { }
}
