import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container-fluid mt-4">
      <div class="row">
        <!-- Sidebar Filters -->
        <div class="col-md-2 border-end">
          <h5 class="fw-bold mb-3">Category</h5>
          <ul class="list-unstyled">
            <li><a style="cursor: pointer" (click)="setCategory('')" [class.fw-bold]="filters.category === ''">All Categories</a></li>
            <li><a style="cursor: pointer" (click)="setCategory('Electronics')" [class.fw-bold]="filters.category === 'Electronics'">Electronics</a></li>
            <li><a style="cursor: pointer" (click)="setCategory('Clothing')" [class.fw-bold]="filters.category === 'Clothing'">Clothing</a></li>
            <li><a style="cursor: pointer" (click)="setCategory('Books')" [class.fw-bold]="filters.category === 'Books'">Books</a></li>
          </ul>

          <h5 class="fw-bold mt-4 mb-3">Price</h5>
          <div class="mb-2">
            <input type="number" class="form-control mb-2" placeholder="Min" [(ngModel)]="filters.minPrice">
            <input type="number" class="form-control mb-2" placeholder="Max" [(ngModel)]="filters.maxPrice">
            <button class="btn btn-outline-primary btn-sm w-100" (click)="applyFilters()">Apply</button>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="col-md-10">
          <h3 class="mb-3" *ngIf="filters.search">Results for "{{ filters.search }}"</h3>
          <h3 class="mb-3" *ngIf="!filters.search && filters.category">{{ filters.category }}</h3>
          <h3 class="mb-3" *ngIf="!filters.search && !filters.category">Featured Items</h3>

          <div class="row">
            <div class="col-md-3 mb-4" *ngFor="let product of products">
              <div class="card h-100 border-0 shadow-sm product-card">
                <a [routerLink]="['/products', product.id]" class="text-decoration-none text-dark">
                  <div class="position-relative" style="height: 200px; overflow: hidden;">
                    <img [src]="product.imageUrl || 'https://via.placeholder.com/200'" class="card-img-top h-100 w-100" style="object-fit: contain;" alt="{{ product.name }}">
                  </div>
                  <div class="card-body p-2">
                    <h6 class="card-title text-truncate mb-1 hover-underline">{{ product.name }}</h6>
                    <div class="fw-bold fs-5 mb-1">\${{ product.price }}</div>
                    <small class="text-muted">Free shipping</small>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hover-underline:hover { text-decoration: underline; }
    .product-card:hover { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
  `]
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
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters.search = params['search'] || '';
      this.filters.category = params['category'] || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
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

  setCategory(category: string): void {
    this.filters.category = category;
    this.loadProducts();
  }
}
