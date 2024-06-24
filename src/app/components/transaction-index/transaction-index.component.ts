import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ItemService } from '../../services/item.service';
import { UserService } from '../../services/user.service';
import { Transaction } from '../../models/transaction.model';
import { Item } from '../../models/item.model';
import { User } from '../../models/user.model';
import { DatePipe, NgForOf } from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transaction-index',
  templateUrl: './transaction-index.component.html',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./transaction-index.component.css']
})
export class TransactionIndexComponent implements OnInit {
  transactions: Transaction[] = [];
  items: Item[] = [];
  users: User[] = [];

  constructor(
    private transactionService: TransactionService,
    private itemService: ItemService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadUsers();
    this.loadTransactions();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editTransaction(id: number): void {
    this.router.navigate(['/transaction-update', id]);
  }

  createTransaction(): void {
    this.router.navigate(['/transaction-create']);
  }


  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  getItemName(itemId: number): string {
    const item = this.items.find(i => i.item_Id === itemId);
    return item ? item.item_Name : 'Unknown Item';
  }

  getUsername(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : 'Unknown User';
  }

  deleteTransaction(id: number): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe(() => {
        this.transactions = this.transactions.filter(t => t.transaction_Id !== id);
      });
    }
  }
}
