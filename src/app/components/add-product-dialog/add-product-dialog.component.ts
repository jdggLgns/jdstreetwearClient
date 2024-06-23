import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product, createDefaultProduct } from 'src/app/models/product';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  product: Product = createDefaultProduct();

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.product.type === 'tshirt' && !this.product.tshirt) {
      this.product.tshirt = { id: 0, sleeves: false };
    } else if (this.product.type === 'sweatshirt' && !this.product.sweatshirt) {
      this.product.sweatshirt = { id: 0, hood: false };
    }
    this.dialogRef.close(this.product);
  }
}
