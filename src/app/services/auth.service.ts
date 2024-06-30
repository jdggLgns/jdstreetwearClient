import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private userKey = 'auth-user';
  private customerIdKey = 'customer-id';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.user) {
          localStorage.setItem(this.userKey, JSON.stringify(response.user));
        }
      }),
      switchMap(response => {
        if (response.user.role === 'customer') {
          return this.getCustomerByUserId(response.user.id).pipe(
            tap(customer => {
              localStorage.setItem(this.customerIdKey, customer.id.toString());
            }),
            switchMap(() => of(response))
          );
        } else {
          return of(response);
        }
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  getCustomerByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/customers/userId?userId=${userId}`);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user).pipe(
      tap(response => console.log('User registered:', response)),
      catchError(this.handleError<any>('register'))
    );
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.customerIdKey);
    this.router.navigate(['/login']);
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getCustomerIdFromStorage(): number | null {
    const customerId = localStorage.getItem(this.customerIdKey);
    return customerId ? parseInt(customerId, 10) : null;
  }

  isAuthenticated(): boolean {
    return this.getUser() !== null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
