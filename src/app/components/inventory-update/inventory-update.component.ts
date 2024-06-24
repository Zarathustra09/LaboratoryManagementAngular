import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../../models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-inventory-update',
  templateUrl: './inventory-update.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./inventory-update.component.css']
})
export class InventoryUpdateComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInventory();
    this.loadItems(); // Fetch items when component initializes
  }

  loadInventory(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.inventoryService.getInventoryItem(+id).subscribe(inventory => {
        this.inventory = inventory;
      });
    } else {
      // Handle the case when 'id' is not available in the route parameters
    }
  }

  updateInventory(): void {
    this.inventoryService.updateInventoryItem(this.inventory.inventory_Id, this.inventory).subscribe(() => {
      this.router.navigate(['/inventory-index']);
    });
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }
}
