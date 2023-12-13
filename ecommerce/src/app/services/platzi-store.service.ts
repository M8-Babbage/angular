import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/platzi.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlatziStoreService {
  private URL: string = 'https://api.escuelajs.co/api/v1';

  constructor(private http: HttpClient) { }

  getProducts(offset: number): Observable<Product[]> {
    const params = new HttpParams({
      fromObject: {
        limit: 9,
        offset: offset,
      }
    });

    return this.http.get<Product[]>(`${this.URL}/products`, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/products/${id}`);
  }

}
