import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
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

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product.id, 1).subscribe({
      next: () => this.toastr.success('Added to cart', product.name),
      error: () => this.toastr.error('Failed to add to cart. Please login.')
    });
  }
}
