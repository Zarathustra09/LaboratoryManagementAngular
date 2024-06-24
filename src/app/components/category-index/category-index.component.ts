import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import {DatePipe, JsonPipe, NgForOf} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {InventoryIndexComponent} from "../inventory-index/inventory-index.component";

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    JsonPipe,
    RouterLink,
    InventoryIndexComponent
  ],
  styleUrls: ['./category-index.component.css']
})
export class CategoryIndexComponent implements OnInit {
  categories: Category[] = [];

  constructor(private router: Router, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  editCategory(id: number): void {
    this.router.navigate(['/category-update', id]);
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        // Filter out the deleted category from the local array
        this.categories = this.categories.filter(category => category.category_Id !== id);
      });
    }
  }
}
