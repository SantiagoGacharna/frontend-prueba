import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: any;
  url: string = environment.baseUrl;
  client: any = {
    id_client: 0,
    full_name: '',
    cellphone: '',
    birthdate: null
  };

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients () {
    this.clientsService.getAllClients()
    .subscribe({
      next: (clients) => {
        this.clients = clients;
      }
    });
  }

  logEvent (e:any, type:string) {
    switch (type) {
      case 'add':
        this.clientsService.addClient(e.data)
        .subscribe({
          next: () => {
            this.getClients();
          }
        });
        break;
      case 'update':
        this.client.id_client = e.oldData.id_client;
        this.client.full_name = e.newData.full_name ? e.newData.full_name : e.oldData.full_name;
        this.client.cellphone = e.newData.cellphone ? e.newData.cellphone : e.oldData.cellphone;
        this.client.birthdate = e.newData.birthdate ? e.newData.birthdate : e.oldData.birthdate;

        this.clientsService.updateClient(this.client)
        .subscribe({
          next: () => {
            this.getClients();
          }
        });
        break;
      case 'delete':
        this.clientsService.deleteClient(e.data.id_client)
        .subscribe({
          next: () => {
            this.getClients();
          }
        });
        break;
      default:
        break;
    }
  }
}
