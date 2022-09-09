import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categories: any;
  products: any;
  url: string = environment.baseUrl;
  product: any = {
    id_product: 0,
    category_id: 0,
    name: '',
    description: '',
    price: 0,
    inventory: 0
  };

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService) {  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts () {
    this.productsService.getAllProducts()
    .subscribe({
      next: (products) => {
        this.products = products;
      }
    });
  }

  getCategories () {
    this.categoriesService.getAllCategories()
    .subscribe({
      next: (categories) => {
        this.categories = categories;
      }
    });
  }

  logEvent (e:any, type:string) {
    switch (type) {
      case 'add':
        this.productsService.addProduct(e.data)
        .subscribe({
          next: () => {
            this.getProducts();
          }
        });
        break;
      case 'update':
        this.product.id_product = e.oldData.id_product;
        this.product.category_id = e.newData.category_id ? e.newData.category_id : e.oldData.category_id;
        this.product.name = e.newData.name ? e.newData.name : e.oldData.name;
        this.product.description = e.newData.description ? e.newData.description : e.oldData.description;
        this.product.inventory = e.newData.inventory ? e.newData.inventory : e.oldData.inventory;
        this.product.price = e.newData.price ? e.newData.price : e.oldData.price;

        this.productsService.updateProduct(this.product)
        .subscribe({
          next: () => {
            this.getProducts();
          }
        });
        break;
      case 'delete':
        this.productsService.deleteProduct(e.data.id_product)
        .subscribe({
          next: () => {
            this.getProducts();
          }
        });
        break;
      default:
        break;
    }
  }
}
