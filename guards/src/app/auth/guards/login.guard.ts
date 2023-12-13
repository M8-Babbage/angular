import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanLoad, CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap(isAuthenticated => console.log(isAuthenticated)),
      tap(isAuthenticated => {
        if (isAuthenticated) this.router.navigate(['./heroes/list'])
      }),
      map(isAutenticared => !isAutenticared)
    )
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
}
