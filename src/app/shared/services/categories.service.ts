import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllCategories (): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/api/category');
  }

  addCategory (addCategory: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl + '/api/category', addCategory);
  }

  updateCategory (updateCategory: Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl + '/api/category', updateCategory);
  }

  deleteCategory (id: number) {
    return this.http.delete(this.baseUrl + '/api/category/' + id);
  }
}
