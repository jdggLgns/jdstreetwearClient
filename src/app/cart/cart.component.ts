import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() cart: Cart | null = null;
  @Output() close = new EventEmitter<void>();
  userId: number = 0;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
    }
  }

  closeCart(): void {
    this.close.emit();
  }

  removeItem(productId: number): void {
    if (this.cart && this.cart.items) {
      this.cartService.removeFromCart(this.userId, productId).subscribe(() => {
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
    alert('Thank you for your purchase!');
    this.cart = null;
    this.router.navigate(['/customer']);
  }
}
