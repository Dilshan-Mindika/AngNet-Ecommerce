import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4" *ngIf="product">
      <div class="row">
        <!-- Image Gallery -->
        <div class="col-md-6 mb-4">
          <div class="border rounded p-3 text-center">
            <img [src]="product.imageUrl || 'https://via.placeholder.com/500'" class="img-fluid" style="max-height: 500px;" alt="{{ product.name }}">
          </div>
        </div>

        <!-- Product Info -->
        <div class="col-md-6">
          <h2 class="fw-bold mb-2">{{ product.name }}</h2>
          <div class="mb-3">
            <span class="text-warning">
              <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half-o"></i>
            </span>
            <span class="text-muted ms-2">(12 reviews)</span>
          </div>
          <hr>
          
          <div class="mb-4">
            <div class="d-flex align-items-center mb-2">
              <span class="text-muted me-3" style="min-width: 100px;">Price:</span>
              <span class="fs-4 fw-bold text-danger">\${{ product.price }}</span>
            </div>
            <div class="d-flex align-items-center mb-2">
              <span class="text-muted me-3" style="min-width: 100px;">Condition:</span>
              <span>New with tags</span>
            </div>
            <div class="d-flex align-items-center mb-2">
              <span class="text-muted me-3" style="min-width: 100px;">Availability:</span>
              <span [class.text-success]="product.stockQuantity > 0" [class.text-danger]="product.stockQuantity === 0">
                {{ product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock' }}
              </span>
            </div>
          </div>

          <div class="card bg-light border-0 p-3 mb-4">
            <div class="d-grid gap-2">
              <button class="btn btn-primary btn-lg rounded-pill" (click)="buyNow()">Buy It Now</button>
              <button class="btn btn-outline-primary btn-lg rounded-pill" (click)="addToCart()">Add to cart</button>
              <button class="btn btn-outline-secondary btn-sm rounded-pill mt-2"><i class="fa fa-heart-o"></i> Add to Watchlist</button>
            </div>
          </div>

          <div class="mb-4">
            <h5 class="fw-bold">Description</h5>
            <p>{{ product.description }}</p>
          </div>

          <div class="border p-3 rounded bg-white shadow-sm">
            <div class="d-flex align-items-center">
              <img src="https://via.placeholder.com/50" class="rounded-circle me-3" alt="Seller">
              <div>
                <h6 class="mb-0">Sold by <a href="#">AngNet Official Store</a></h6>
                <small class="text-muted">99.8% Positive Feedback</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe(data => {
      this.product = data;
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, 1).subscribe({
        next: () => this.toastr.success('Added to cart'),
        error: () => this.toastr.error('Failed to add to cart')
      });
    }
  }

  buyNow(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, 1).subscribe({
        next: () => {
          // Navigate to checkout logic would go here, for now just toast
          this.toastr.success('Proceeding to checkout...');
        },
        error: () => this.toastr.error('Failed to process')
      });
    }
  }
}
