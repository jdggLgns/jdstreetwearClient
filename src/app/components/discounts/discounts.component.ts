import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiscountService } from 'src/app/services/discount.service';
import { Discount } from 'src/app/models/discount';
import { AddDiscountDialogComponent } from 'src/app/components/add-discount-dialog/add-discount-dialog.component';
import { EditDiscountDialogComponent } from 'src/app/components/edit-discount-dialog/edit-discount-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  discounts: Discount[] = [];
  userName: string = '';

  constructor(
    private discountService: DiscountService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDiscounts();
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.firstName;
    }
  }

  loadDiscounts(): void {
    this.discountService.getDiscounts().subscribe((data: Discount[]) => {
      this.discounts = data;
    });
  }

  addDiscount(): void {
    const dialogRef = this.dialog.open(AddDiscountDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.discountService.createDiscount(result).subscribe(() => {
          this.loadDiscounts();
        });
      }
    });
  }

  editDiscount(discount: Discount): void {
    const dialogRef = this.dialog.open(EditDiscountDialogComponent, {
      width: '400px',
      data: discount
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.discountService.updateDiscount(discount.id, result).subscribe(() => {
          this.loadDiscounts();
        });
      }
    });
  }

  deleteDiscount(id: number): void {
    this.discountService.deleteDiscount(id).subscribe(() => {
      this.loadDiscounts();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
