import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CategoryIndexComponent} from "./components/category-index/category-index.component";
import {CategoryCreateComponent} from "./components/category-create/category-create.component";
import {CategoryUpdateComponent} from "./components/category-update/category-update.component";
import {ItemIndexComponent} from "./components/item-index/item-index.component";
import {ItemCreateComponent} from "./components/item-create/item-create.component";
import {ItemUpdateComponent} from "./components/item-update/item-update.component";
import {InventoryIndexComponent} from "./components/inventory-index/inventory-index.component";
import {InventoryCreateComponent} from "./components/inventory-create/inventory-create.component";
import {InventoryUpdateComponent} from "./components/inventory-update/inventory-update.component";
import {TransactionIndexComponent} from "./components/transaction-index/transaction-index.component";
import {TransactionCreateComponent} from "./components/transaction-create/transaction-create.component";
import {TransactionUpdateComponent} from "./components/transaction-update/transaction-update.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category-index', component: CategoryIndexComponent},
  {path: 'category-create', component: CategoryCreateComponent},
  {path: 'category-update/:id', component: CategoryUpdateComponent},
  {path: 'item-index', component: ItemIndexComponent},
  {path: 'item-create', component: ItemCreateComponent},
  {path: 'item-update/:id', component: ItemUpdateComponent},
  {path: 'inventory-index', component: InventoryIndexComponent},
  {path: 'inventory-create', component: InventoryCreateComponent},
  {path: 'inventory-update/:id', component: InventoryUpdateComponent},
  {path: 'transaction-index', component: TransactionIndexComponent},
  {path: 'transaction-create', component: TransactionCreateComponent},
  {path: 'transaction-update/:id', component: TransactionUpdateComponent},
];
