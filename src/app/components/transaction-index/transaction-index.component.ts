import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import {DatePipe, NgForOf} from "@angular/common";

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

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  deleteTransaction(id: number): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe(() => {
        this.transactions = this.transactions.filter(t => t.transaction_Id !== id);
      });
    }
  }
}
