import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { ProductsComponent } from './pages/products/products.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: '**',
    redirectTo: 'invoice'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule, CommonModule],
  exports: [RouterModule],
  declarations: [
    ProductsComponent,
    ClientsComponent,
    InvoiceComponent,
    CategoriesComponent
  ]
})
export class AppRoutingModule { }
