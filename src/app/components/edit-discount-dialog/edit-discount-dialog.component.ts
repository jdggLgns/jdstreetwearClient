import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Discount } from 'src/app/models/discount';

@Component({
  selector: 'app-edit-discount-dialog',
  templateUrl: './edit-discount-dialog.component.html',
  styleUrls: ['./edit-discount-dialog.component.css']
})
export class EditDiscountDialogComponent {
  discount: Discount;

  constructor(
    public dialogRef: MatDialogRef<EditDiscountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Discount
  ) {
    this.discount = { ...data };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.discount);
  }
}
