import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { Category } from 'src/app/interfaces/Category';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  categories: Category[] = [];

  constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.getAllCategoriesFromApiService();
  }

  private getAllCategoriesFromApiService(): void {
    this.ApiService.getCategory().subscribe((categories: any) => {
      this.categories = categories;
      console.log(this.categories);
    });
  }
}
