import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllInvoices (): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.baseUrl + '/api/invoice');
  }

  addInvoice (addInvoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.baseUrl + '/api/invoice', addInvoice);
  }

  updateInvoice (updateInvoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(this.baseUrl + '/api/invoice', updateInvoice);
  }

  deleteInvoice (id: number) {
    return this.http.delete(this.baseUrl + '/api/invoice/' + id);
  }
}
