import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prod } from '../models/prod';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdottiService {
  urlDatabase: string = 'http://localhost:4201';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Prod[]>(`${this.urlDatabase}/products`);
  }

  getSingleProduct(id: number) {
    return this.http.get<Prod>(`${this.urlDatabase}/products/${id}`);
  }
}
