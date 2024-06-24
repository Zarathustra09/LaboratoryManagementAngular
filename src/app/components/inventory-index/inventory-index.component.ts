import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory.model';
import {DatePipe, NgForOf} from "@angular/common";

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

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe(items => {
      this.inventoryItems = items;
    });
  }

  deleteItem(id: number): void {
    this.inventoryService.deleteInventoryItem(id).subscribe(() => {
      // Reload inventory list after deletion
      this.loadInventory();
    });
  }
}
