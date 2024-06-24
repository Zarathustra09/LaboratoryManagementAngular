import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ItemService } from '../../services/item.service';
import { Inventory } from '../../models/inventory.model';
import { Item } from '../../models/item.model';
import { DatePipe, NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-index',
  templateUrl: './inventory-index.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./inventory-index.component.css']
})
export class InventoryIndexComponent implements OnInit {
  inventoryItems: Inventory[] = [];
  items: Item[] = [];

  constructor(
    private inventoryService: InventoryService,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.loadInventory();
    });
  }

  editInventory(id: number): void {
    this.router.navigate(['/inventory-update', id]);
  }

  createInventory(): void {
    this.router.navigate(['/inventory-create']);
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(inventory => {
      this.inventoryItems = inventory.map(inv => {
        const item = this.items.find(i => i.item_Id === inv.item_Id);
        return {
          ...inv,
          itemName: item ? item.item_Name : 'Unknown Item'
        };
      });
    });
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryService.deleteInventoryItem(id).subscribe(() => {
        this.inventoryItems = this.inventoryItems.filter(i => i.inventory_Id !== id);
      });
    }
  }
}
