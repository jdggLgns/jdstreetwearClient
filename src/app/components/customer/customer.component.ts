import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Product, Category } from 'src/app/models/product';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  userName: string = '';
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  searchQuery: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.role === 'customer') {
      this.userName = user.firstName;
      this.loadCategories();
      this.filterProducts();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = [{ id: 0, name: 'All' }, ...data];
    });
  }

  filterProducts(): void {
    const categoryId = this.selectedCategoryId !== 0 ? this.selectedCategoryId : undefined;
    this.productService.searchProducts(this.searchQuery, categoryId).subscribe(data => {
      this.products = data;
    });
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
