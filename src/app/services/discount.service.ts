import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discount } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private baseUrl = 'http://localhost:8080/api/discounts';

  constructor(private http: HttpClient) {}

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(`${this.baseUrl}`);
  }
}
