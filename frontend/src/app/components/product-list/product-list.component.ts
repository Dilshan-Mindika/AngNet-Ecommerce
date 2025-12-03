import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="row mb-4">
        <div class="col-md-3">
          <input type="text" class="form-control" placeholder="Search products..." [(ngModel)]="filters.search" (keyup.enter)="applyFilters()">
        </div>
        <div class="col-md-3">
          <select class="form-select" [(ngModel)]="filters.category" (change)="applyFilters()">
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
          </select>
        </div>
        <div class="col-md-2">
          <input type="number" class="form-control" placeholder="Min Price" [(ngModel)]="filters.minPrice" (change)="applyFilters()">
        </div>
        <div class="col-md-2">
          <input type="number" class="form-control" placeholder="Max Price" [(ngModel)]="filters.maxPrice" (change)="applyFilters()">
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100" (click)="applyFilters()">Filter</button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3" *ngFor="let product of products">
          <div class="card mb-4 shadow-sm">
            <img [src]="product.imageUrl || 'https://via.placeholder.com/200'" class="card-img-top" alt="{{ product.name }}">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text text-truncate">{{ product.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a [routerLink]="['/products', product.id]" class="btn btn-sm btn-outline-secondary">View</a>
                  <button type="button" class="btn btn-sm btn-outline-primary" (click)="addToCart(product)">Add to Cart</button>
                </div>
                <small class="text-muted">\${{ product.price }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filters: any = {
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Remove null/empty filters
    const params: any = {};
    if (this.filters.search) params.search = this.filters.search;
    if (this.filters.category) params.category = this.filters.category;
    if (this.filters.minPrice) params.minPrice = this.filters.minPrice;
    if (this.filters.maxPrice) params.maxPrice = this.filters.maxPrice;

    this.productService.getProducts(params).subscribe(data => {
      this.products = data;
    });
  }

  applyFilters(): void {
    this.loadProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product.id, 1).subscribe({
      next: () => this.toastr.success('Added to cart', product.name),
      error: () => this.toastr.error('Failed to add to cart. Please login.')
    });
  }
}
