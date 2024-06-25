import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  products: Product[] = [];
  searchQuery: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  searchProducts(): void {
    if (this.searchQuery) {
      this.productService.searchProducts(this.searchQuery).subscribe((data: Product[]) => {
        this.products = data;
      });
    } else {
      this.loadAllProducts();
    }
  }
}
