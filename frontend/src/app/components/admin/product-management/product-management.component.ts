import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-product-management',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="fw-bold mb-1">Product Management</h1>
          <p class="text-muted mb-0">Manage your store's inventory.</p>
        </div>
        <a routerLink="/admin/products/new" class="btn btn-primary"><i class="fa fa-plus me-2"></i>Add New Product</a>
      </div>

      <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0 align-middle">
              <thead class="table-light">
                <tr>
                  <th class="ps-4">Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th class="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let product of products">
                  <td class="ps-4">
                    <img [src]="product.imageUrl" alt="{{ product.name }}" class="rounded" style="width: 40px; height: 40px; object-fit: cover;">
                  </td>
                  <td class="fw-bold">{{ product.name }}</td>
                  <td><span class="badge bg-light text-dark">{{ product.category }}</span></td>
                  <td>\${{ product.price }}</td>
                  <td>{{ product.stockQuantity }}</td>
                  <td class="text-end pe-4">
                    <a [routerLink]="['/admin/products/edit', product.id]" class="btn btn-sm btn-outline-primary me-2">
                        <i class="fa fa-edit"></i> Edit
                    </a>
                    <button class="btn btn-sm btn-outline-danger" (click)="deleteProduct(product)">
                        <i class="fa fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
                 <tr *ngIf="products.length === 0">
                    <td colspan="6" class="text-center py-5 text-muted">No products found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: []
})
export class ProductManagementComponent implements OnInit {
    products: Product[] = [];

    constructor(
        private productService: ProductService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.productService.getProducts().subscribe({
            next: (data) => this.products = data,
            error: (err) => this.toastr.error('Failed to load products')
        });
    }

    deleteProduct(product: Product): void {
        if (confirm(`Are you sure you want to delete ${product.name}?`)) {
            this.productService.deleteProduct(product.id).subscribe({
                next: () => {
                    this.toastr.success('Product deleted successfully');
                    this.loadProducts();
                },
                error: (err) => this.toastr.error('Failed to delete product')
            });
        }
    }
}
