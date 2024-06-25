import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {
  categoryForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.formBuilder.group({
      category_Name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

    const category: Category = this.categoryForm.value;
    this.categoryService.createCategory(category).subscribe(() => {
      this.router.navigate(['/category-index']);
    });
  }
}
