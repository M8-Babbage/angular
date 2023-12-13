import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Inyección de dependencias
  private http = inject(HttpClient);

  // Definición y declaración de variables
  private baseURL = 'https://reqres.in/api/users';

  // Declaración de métodos
  public getUserById(id: number): Observable<User> {
    return this.http.get<SingleUserResponse>(`${this.baseURL}/${id}`, {}).pipe(map((response) => {
      return response.data;
    }))
  }
}
