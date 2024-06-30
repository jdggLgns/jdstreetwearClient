import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-finish-purchase',
  templateUrl: './finish-purchase.component.html',
  styleUrls: ['./finish-purchase.component.css']
})
export class FinishPurchaseComponent implements OnInit {
  customer: Customer | null = null;
  customerId: number | null = null;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private cartService: CartService,
    private router: Router
  ) {
    this.customerId = this.authService.getCustomerIdFromStorage();
  }

  ngOnInit(): void {
    if (this.customerId) {
      this.customerService.getCustomerById(this.customerId).subscribe(
        (customer: Customer) => {
          this.customer = customer;
        },
        (error) => {
          console.error('Error retrieving customer', error);
        }
      );
    }
  }

  finalizePurchase(): void {
    if (this.customerId && this.customer) {
      const totalAmount = this.cartService.getCart(this.customerId).subscribe(cart => {
        const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        if (this.customer!.wallet >= total) {
          this.customer!.wallet -= total;
          this.customerService.updateCustomer(this.customerId!, this.customer!).subscribe(() => {
            this.cartService.clearCart(this.customerId!).subscribe(() => {
              alert('Thank you for your purchase!');
              this.router.navigate(['/customer']);
            });
          });
        } else {
          alert('Insufficient balance in wallet.');
        }
      });
    }
  }
}
