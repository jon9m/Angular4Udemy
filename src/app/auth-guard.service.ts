import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { FireBaseAuthService } from "app/auth/firebase.auth.service";

@Injectable()
// export class AuthGuard implements CanActivate, CanActivateChild {
export class AuthGuard implements CanActivate {

    constructor(private authService: FireBaseAuthService, private router: Router) { }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.authService.isAuthenticated();
    }


    // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise < boolean > {
    //     return this.canActivate(childRoute, state);
    // }
}