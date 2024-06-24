import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://localhost:7151/api/Inventory';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Adjust based on your JWT storage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getInventoryItem(id: number): Observable<Inventory> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Inventory>(url, { headers: this.getHeaders() });
  }

  addInventoryItem(inventory: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.apiUrl, inventory, { headers: this.getHeaders() });
  }

  updateInventoryItem(id: number, inventory: Inventory): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, inventory, { headers: this.getHeaders() });
  }

  deleteInventoryItem(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}
