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
  customerId: number | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.customerId = this.authService.getCustomerIdFromStorage();
  }

  addToCart(): void {
    if (this.product && this.customerId) {
      this.cartService.addToCart(this.customerId, this.product.id, this.quantity).subscribe(() => {
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
