import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { ItemService } from '../../services/item.service';
import { UserService } from '../../services/user.service';
import { Transaction } from '../../models/transaction.model';
import { Item } from '../../models/item.model';
import { User } from '../../models/user.model';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {
  transactionForm: FormGroup;
  submitted = false;
  items: Item[] = [];
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private transactionService: TransactionService,
    private itemService: ItemService,
    private userService: UserService
  ) {
    this.transactionForm = this.formBuilder.group({
      item_Id: ['', Validators.required],
      user_Id: ['', Validators.required],
      transaction_Type: ['', Validators.required],
      quantity: ['', Validators.required],
      transaction_Date: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadItems();
    this.loadUsers();
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

  onSubmit(): void {
    this.submitted = true;

    if (this.transactionForm.invalid) {
      return;
    }

    const transaction: Transaction = this.transactionForm.value;
    this.transactionService.addTransaction(transaction).subscribe(() => {
      this.router.navigate(['/transaction-index']);
    });
  }
}
