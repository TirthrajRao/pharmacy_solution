import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public _userService:UserService,
    public router:Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   const currentUser = this._userService.currentUserValue;
    if (currentUser != null) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}


export class LoginGuard implements CanActivate {

  constructor(
  
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return false;
    } else {
      return true;
    }
  }
}
