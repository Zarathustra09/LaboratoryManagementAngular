import { Component } from '@angular/core';
import {InventoryIndexComponent} from "../inventory-index/inventory-index.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    InventoryIndexComponent,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
