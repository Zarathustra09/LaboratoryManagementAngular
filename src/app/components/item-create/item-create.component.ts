import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { Category } from '../../models/category.model'; // Import Category model
import { CategoryService } from '../../services/category.service';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common"; // Import CategoryService

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {
  item: Item = {
    item_Id: 0,
    item_Name: '',
    description: '',
    category_Id: 0,
    created_At: new Date()
  };

  categories: Category[] = [];
  selectedCategoryId: number | null = null; // Property to hold selected category ID

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.selectedCategoryId !== null) {
      this.item.category_Id = this.selectedCategoryId; // Assign selected category ID to item object
      this.itemService.addItem(this.item).subscribe(() => {
        this.router.navigate(['/item-index']);
      });
    } else {
      // Handle case where selectedCategoryId is null (optional)
      console.error('Selected category ID is null.');
      // You may choose to show an error message to the user or handle it differently.
    }
  }

}
