import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { AddProductDialogComponent } from 'src/app/components/add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from 'src/app/components/edit-product-dialog/edit-product-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  userName: string = '';

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.firstName;
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.createProduct(result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(product.id, result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
