import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cart } from 'src/app/models/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  customerId: number | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.customerId = this.authService.getCustomerIdFromStorage();
  }

  ngOnInit(): void {
    if (this.customerId) {
      this.cartService.getCart(this.customerId).subscribe(cart => this.cart = cart);
    }
  }

  removeItem(productId: number): void {
    if (this.cart && this.cart.items && this.customerId) {
      this.cartService.removeFromCart(this.customerId, productId).subscribe(() => {
        this.cart!.items = this.cart!.items.filter(item => item.product.id !== productId);
      });
    }
  }

  getTotal(): number {
    return this.cart && this.cart.items 
      ? this.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0) 
      : 0;
  }

  confirmPurchase(): void {
    this.router.navigate(['/finish-purchase']);
  }

  clearCart(): void {
    if (this.customerId) {
      this.cartService.clearCart(this.customerId).subscribe(() => {
        this.cart = null;
      });
    }
  }
}
