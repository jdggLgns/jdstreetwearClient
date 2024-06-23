import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discount } from '../models/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private baseUrl = 'http://localhost:8080/api/discounts';

  constructor(private http: HttpClient) {}

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.baseUrl}`);
  }

  createDiscount(discount: Discount): Observable<Discount> {
    return this.http.post<Discount>(`${this.baseUrl}`, discount);
  }

  updateDiscount(id: number, discount: Discount): Observable<Discount> {
    return this.http.put<Discount>(`${this.baseUrl}/${id}`, discount);
  }

  deleteDiscount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
