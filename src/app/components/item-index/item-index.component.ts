import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import {Router, RouterLink} from "@angular/router";
import {DatePipe, NgForOf} from "@angular/common";
import {InventoryIndexComponent} from "../inventory-index/inventory-index.component";

@Component({
  selector: 'app-item-index',
  templateUrl: './item-index.component.html',
  standalone: true,
    imports: [
        RouterLink,
        NgForOf,
        DatePipe,
        InventoryIndexComponent
    ],
  styleUrls: ['./item-index.component.css']
})
export class ItemIndexComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  editItem(id: number): void {
    this.router.navigate(['/item-update', id]);
  }

  createItem(): void {
    this.router.navigate(['/item-create']);
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.item_Id !== id);
    });
  }
}
