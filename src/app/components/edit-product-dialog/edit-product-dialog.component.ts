import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product, createDefaultProduct } from 'src/app/models/product';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent {
  product: Product;

  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.product = { ...createDefaultProduct(), ...data };

    if (this.product.type === 'tshirt' && !this.product.tshirt) {
      this.product.tshirt = { id: 0, sleeves: false };
    }

    if (this.product.type === 'sweatshirt' && !this.product.sweatshirt) {
      this.product.sweatshirt = { id: 0, hood: false };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.product);
  }
}
