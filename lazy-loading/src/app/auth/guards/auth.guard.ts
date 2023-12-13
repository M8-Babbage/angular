import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Auth } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  get auth(): Auth {
    return this.authService.auth;
  }

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.verificaAutenticacion().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
    //   if (this.auth.id) {
    //     return true;
    //   } else {
    //     console.log('Bloqueado por el AuthGuard - canActivate');
    //     return false;
    //   }
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.verificaAutenticacion().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
    //   if (this.auth.id ) {
    //     return true;
    //   } else {
    //     console.log('Bloqueado por el AuthGuard - canLoad');
    //     return false;
    //   }
  }
}
