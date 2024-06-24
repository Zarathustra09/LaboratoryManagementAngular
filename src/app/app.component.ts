import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {CategoryService} from "./services/category.service";
import {ItemService} from "./services/item.service";
import {InventoryService} from "./services/inventory.service";
import {TransactionService} from "./services/transaction.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService,CategoryService,ItemService,InventoryService, TransactionService]
})
export class AppComponent {
  title = 'LaboratoryManagementAngular';
}
