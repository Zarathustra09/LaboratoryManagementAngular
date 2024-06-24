import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import {RouterLink} from "@angular/router";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-item-index',
  templateUrl: './item-index.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./item-index.component.css']
})
export class ItemIndexComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
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
