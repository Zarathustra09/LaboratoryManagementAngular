import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://localhost:7151/api/Item';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token'); // Adjust based on your JWT storage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Item>(url, { headers: this.getHeaders() });
  }

  updateItem(id: number, item: Item): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, item, { headers: this.getHeaders() });
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item, { headers: this.getHeaders() });
  }

  deleteItem(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}
