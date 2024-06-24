import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms'; // Import necessary form-related modules
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent {
  transactionForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private transactionService: TransactionService
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
