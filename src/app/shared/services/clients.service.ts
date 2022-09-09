import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllClients (): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + '/api/client');
  }

  addClient (addClient: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl + '/api/client', addClient);
  }

  updateClient (updateClient: Client): Observable<Client> {
    return this.http.put<Client>(this.baseUrl + '/api/client', updateClient);
  }

  deleteClient (id: number) {
    return this.http.delete(this.baseUrl + '/api/client/' + id);
  }
}
