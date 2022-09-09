import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { InvoicesService } from 'src/app/shared/services/invoices.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  products: any;
  clients: any;
  invoices: any;
  url: string = environment.baseUrl;
  invoice: any = {
    id_invoice: 0,
    client_id: 0,
    product_id: 0,
    amount: 0,
    invoice_price: 0,
    invoice_date: null,
  };

  constructor(private invoicesService: InvoicesService, private clientsService: ClientsService, private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.getInvoices();
    this.getProducts();
    this.getClients();
  }

  getInvoices () {
    this.invoicesService.getAllInvoices()
    .subscribe({
      next: (invoices) => {
        this.invoices = invoices;
      }
    });
  }

  getProducts () {
    this.productsService.getAllProducts()
    .subscribe({
      next: (products) => {
        this.products = products;
      }
    });
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
        this.invoicesService.addInvoice(e.data)
        .subscribe({
          next: () => {
            this.getInvoices();
          }
        });
        break;
      case 'update':
        this.invoice.id_invoice = e.oldData.id_invoice;
        this.invoice.client_id = e.newData.client_id ? e.newData.client_id : e.oldData.client_id;
        this.invoice.product_id = e.newData.product_id ? e.newData.product_id : e.oldData.product_id;
        this.invoice.amount = e.newData.amount ? e.newData.amount : e.oldData.amount;
        this.invoice.invoice_price = e.newData.invoice_price ? e.newData.invoice_price : e.oldData.invoice_price;
        this.invoice.invoice_date = e.newData.invoice_date ? e.newData.invoice_date : e.oldData.invoice_date;

        this.invoicesService.updateInvoice(this.invoice)
        .subscribe({
          next: () => {
            this.getInvoices();
          }
        });
        break;
      case 'delete':
        this.invoicesService.deleteInvoice(e.data.id_invoice)
        .subscribe({
          next: () => {
            this.getInvoices();
          }
        });
        break;
      default:
        break;
    }
  }
}
