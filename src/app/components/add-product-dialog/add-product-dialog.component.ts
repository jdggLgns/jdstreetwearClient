import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product, createDefaultProduct, Category, Discount, Supplier } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { DiscountService } from 'src/app/services/discount.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  product: Product = createDefaultProduct();
  categories: Category[] = [];
  discounts: Discount[] = [];
  suppliers: Supplier[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private discountService: DiscountService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadDiscounts();
    this.loadSuppliers();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadDiscounts(): void {
    this.discountService.getDiscounts().subscribe(data => {
      this.discounts = data;
    });
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

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
