import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, tap } from "rxjs";
import { environments } from "src/environments/environments";
import { User } from "../interfaces/user.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  private baseUrl = environments.baseUrl;
  private user?: User;

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    // Clonación profunda
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap(user => this.user = user),
      tap(user => localStorage.setItem('token', 'asfsdfklsjadlfk.21312l312.123ldksjaf'))
    )
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false)
    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap(user => this.user = user),
      map(user => !!user),
      catchError(err => of(false))
    )
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}