import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() product: Product | undefined;
  @Output() close = new EventEmitter<void>();
  quantity: number = 1;
  userId: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.userId, this.product.id, this.quantity).subscribe(() => {
        this.close.emit();
      }, error => {
        console.error('Error adding to cart', error);
      });
    }
  }

  closeDetail(): void {
    this.close.emit();
  }
}
