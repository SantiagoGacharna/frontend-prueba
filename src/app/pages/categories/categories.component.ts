import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any;
  url: string = environment.baseUrl;
  category: any = {
    id_category: 0,
    name: ''
  };

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
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
        this.categoriesService.addCategory(e.data)
        .subscribe({
          next: () => {
            this.getCategories();
          }
        });
        break;
      case 'update':
        this.category.id_category = e.oldData.id_category;
        this.category.name = e.newData.name ? e.newData.name : e.oldData.name;

        this.categoriesService.updateCategory(this.category)
        .subscribe({
          next: () => {
            this.getCategories();
          }
        });
        break;
      case 'delete':
        this.categoriesService.deleteCategory(e.data.id_category)
        .subscribe({
          next: () => {
            this.getCategories();
          }
        });
        break;
      default:
        break;
    }
  }

}
