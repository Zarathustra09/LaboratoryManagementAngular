import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  categoryId: number = 0;
  category: Category = {
    category_Id: 0,
    category_Name: '',
    description: '',
    created_At: new Date()
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== undefined) {
      this.categoryId = +idParam;
      this.getCategory(this.categoryId);
    } else {
      // Handle the case where 'id' parameter is not present or not valid
      console.error("Category ID parameter is missing or invalid.");
      // You may want to redirect the user to an error page or handle it differently
    }
  }


  getCategory(id: number): void {
    this.categoryService.getCategory(id).subscribe(category => {
      this.category = category;
    });
  }

  onSubmit(): void {
    this.categoryService.updateCategory(this.categoryId, this.category).subscribe(() => {
      this.router.navigate(['/category-index']);
    });
  }
}
