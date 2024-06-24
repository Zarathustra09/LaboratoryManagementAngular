import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent implements OnInit {
  inventory: Inventory = {
    inventory_Id: 0,
    item_Id: 0,
    quantity: 0,
    location: '',
    last_Updated: new Date()
  };
  items: Item[] = []; // Array to hold items fetched from API

  constructor(
    private inventoryService: InventoryService,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadItems(); // Fetch items when component initializes
  }

  createInventory(): void {
    this.inventoryService.addInventoryItem(this.inventory).subscribe(() => {
      this.router.navigate(['/inventory-index']);
    });
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }
}
