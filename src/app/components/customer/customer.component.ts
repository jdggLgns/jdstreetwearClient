import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';
import { Product, Category } from 'src/app/models/product';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  userName: string = '';
  userId: number = 0;
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  searchQuery: string = '';
  cart: Cart | null = null;
  selectedProduct: Product | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.role === 'customer') {
      this.userName = user.firstName;
      this.userId = user.id;
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
    this.productService.getProductById(productId).subscribe(product => {
      this.selectedProduct = product;
    });
  }

  closeProductDetail(): void {
    this.selectedProduct = null;
  }

  openCart(): void {
    this.router.navigate(['/cart']);
  }

  closeCart(): void {
    this.cart = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
