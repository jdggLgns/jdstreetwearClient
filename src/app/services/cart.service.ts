import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) { }

  getCart(customerId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}?customerId=${customerId}`);
  }

  addToCart(customerId: number, productId: number, quantity: number): Observable<Cart> {
    let params = new HttpParams();
    params = params.append('customerId', customerId.toString());
    params = params.append('productId', productId.toString());
    params = params.append('quantity', quantity.toString());

    return this.http.post<Cart>(`${this.baseUrl}/add`, null, { params });
  }

  removeFromCart(customerId: number, productId: number): Observable<Cart> {
    let params = new HttpParams();
    params = params.append('customerId', customerId.toString());
    params = params.append('productId', productId.toString());

    return this.http.delete<Cart>(`${this.baseUrl}/remove`, { params });
  }

  clearCart(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clear?customerId=${customerId}`);
  }
}
