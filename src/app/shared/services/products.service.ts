import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + '/api/product');
  }

  addProduct (addProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + '/api/product', addProduct);
  }

  updateProduct (updateProduct: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + '/api/product', updateProduct);
  }

  deleteProduct (id: number) {
    return this.http.delete(this.baseUrl + '/api/product/' + id);
  }
}
