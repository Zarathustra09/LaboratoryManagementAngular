import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { Category } from '../../models/category.model'; // Import Category model
import {FormsModule, NgForm} from '@angular/forms';
import {CategoryService} from "../../services/category.service";
import {NgForOf} from "@angular/common"; // Import NgForm for form handling

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent implements OnInit {
  item: Item = {
    item_Id: 0,
    item_Name: '',
    description: '',
    category_Id: 0, // Initialize as null
    created_At: new Date()
  };
  categories: Category[] = []; // Array to hold categories

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService // Inject CategoryService
  ) {}

  ngOnInit(): void {
    this.getItem();
    this.loadCategories(); // Load categories for dropdown
  }

  getItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemService.getItem(+id).subscribe(item => {
        this.item = item;
      });
    } else {
      // Handle the case when 'id' is not available in the route parameters
    }
  }

  updateItem(): void {
    this.itemService.updateItem(this.item.item_Id, this.item).subscribe(() => {
      this.router.navigate(['/item-index']);
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
