import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Discount } from 'src/app/models/discount';

@Component({
  selector: 'app-add-discount-dialog',
  templateUrl: './add-discount-dialog.component.html',
  styleUrls: ['./add-discount-dialog.component.css']
})
export class AddDiscountDialogComponent {
  discount: Discount = {
    id: 0,
    name: '',
    percentage: 0,
    state: 'active'
  };

  constructor(public dialogRef: MatDialogRef<AddDiscountDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.discount);
  }
}
