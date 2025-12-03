import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <div class="hero-section bg-primary text-white py-5 mb-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="display-4 fw-bold mb-3">Welcome to AngNet Shop</h1>
            <p class="lead mb-4">Discover the best deals on Electronics, Fashion, Books, and more. Shop with confidence on the world's most trusted marketplace.</p>
            <a routerLink="/products" class="btn btn-light btn-lg rounded-pill px-4 fw-bold text-primary">Shop Now</a>
          </div>
          <div class="col-md-6 text-center d-none d-md-block">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" alt="Hero Image" class="img-fluid rounded shadow-lg">
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- Featured Categories -->
      <h2 class="fw-bold mb-4">Featured Categories</h2>
      <div class="row mb-5">
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm category-card" style="background: url('https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;">
            <div class="card-body text-center p-5 text-white" style="background: rgba(0,0,0,0.5);">
              <i class="fa fa-laptop fa-4x mb-3"></i>
              <h4 class="card-title fw-bold">Electronics</h4>
              <p class="card-text">Latest gadgets and accessories.</p>
              <a routerLink="/products" [queryParams]="{category: 'Electronics'}" class="btn btn-light rounded-pill fw-bold">Explore</a>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm category-card" style="background: url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop') center/cover no-repeat;">
            <div class="card-body text-center p-5 text-white" style="background: rgba(0,0,0,0.5);">
              <i class="fa fa-shopping-bag fa-4x mb-3"></i>
              <h4 class="card-title fw-bold">Clothing</h4>
              <p class="card-text">Trendy fashion for everyone.</p>
              <a routerLink="/products" [queryParams]="{category: 'Clothing'}" class="btn btn-light rounded-pill fw-bold">Explore</a>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm category-card" style="background: url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;">
            <div class="card-body text-center p-5 text-white" style="background: rgba(0,0,0,0.5);">
              <i class="fa fa-book fa-4x mb-3"></i>
              <h4 class="card-title fw-bold">Books</h4>
              <p class="card-text">Bestsellers and classics.</p>
              <a routerLink="/products" [queryParams]="{category: 'Books'}" class="btn btn-light rounded-pill fw-bold">Explore</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Badges -->
      <div class="bg-light p-5 rounded-3 mb-5">
        <div class="row text-center">
          <div class="col-md-3 mb-3">
            <i class="fa fa-shield fa-3x text-secondary mb-3"></i>
            <h5 class="fw-bold">Secure Payment</h5>
            <p class="text-muted small">100% secure payment with SSL encryption.</p>
          </div>
          <div class="col-md-3 mb-3">
            <i class="fa fa-truck fa-3x text-secondary mb-3"></i>
            <h5 class="fw-bold">Fast Shipping</h5>
            <p class="text-muted small">Reliable delivery to your doorstep.</p>
          </div>
          <div class="col-md-3 mb-3">
            <i class="fa fa-undo fa-3x text-secondary mb-3"></i>
            <h5 class="fw-bold">Easy Returns</h5>
            <p class="text-muted small">30-day money-back guarantee.</p>
          </div>
          <div class="col-md-3 mb-3">
            <i class="fa fa-headphones fa-3x text-secondary mb-3"></i>
            <h5 class="fw-bold">24/7 Support</h5>
            <p class="text-muted small">Dedicated support team for your queries.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%);
    }
    .category-card {
      transition: transform 0.3s ease;
    }
    .category-card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class HomeComponent { }
