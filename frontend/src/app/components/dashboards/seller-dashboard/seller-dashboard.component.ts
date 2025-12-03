import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2 class="mb-4">Seller Dashboard</h2>
      
      <ul class="nav nav-tabs mb-4">
        <li class="nav-item">
          <a class="nav-link active" href="#">My Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Sales History</a>
        </li>
      </ul>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>My Products</h4>
        <button class="btn btn-success" (click)="openAddProductModal()">
          <i class="fa fa-plus"></i> Add New Product
        </button>
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>
                <img [src]="product.imageUrl || 'https://via.placeholder.com/50'" alt="{{ product.name }}" style="width: 50px; height: 50px; object-fit: cover;">
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>\${{ product.price }}</td>
              <td>{{ product.stockQuantity }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-2" (click)="editProduct(product)">Edit</button>
                <button class="btn btn-sm btn-outline-danger" (click)="deleteProduct(product.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Simple Add/Edit Form (Inline for now for simplicity) -->
      <div *ngIf="showForm" class="card mt-4 mb-5 shadow-sm">
        <div class="card-header bg-light fw-bold">
          {{ isEditing ? 'Edit Product' : 'Add New Product' }}
          <button type="button" class="btn-close float-end" (click)="showForm = false"></button>
        </div>
        <div class="card-body">
          <form (ngSubmit)="saveProduct()">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Product Name</label>
                <input type="text" class="form-control" [(ngModel)]="currentProduct.name" name="name" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Category</label>
                <select class="form-select" [(ngModel)]="currentProduct.category" name="category" required>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Price</label>
                <input type="number" class="form-control" [(ngModel)]="currentProduct.price" name="price" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Stock Quantity</label>
                <input type="number" class="form-control" [(ngModel)]="currentProduct.stockQuantity" name="stockQuantity" required>
              </div>
              <div class="col-md-12 mb-3">
                <label class="form-label">Image URL</label>
                <input type="text" class="form-control" [(ngModel)]="currentProduct.imageUrl" name="imageUrl">
              </div>
              <div class="col-md-12 mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="3" [(ngModel)]="currentProduct.description" name="description"></textarea>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">{{ isEditing ? 'Update' : 'Create' }} Product</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SellerDashboardComponent implements OnInit {
  products: Product[] = [];
  showForm = false;
  isEditing = false;
  currentProduct: any = {
    name: '',
    category: 'Electronics',
    price: 0,
    stockQuantity: 0,
    description: '',
    imageUrl: ''
  };

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  openAddProductModal(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentProduct = {
      name: '',
      category: 'Electronics',
      price: 0,
      stockQuantity: 0,
      description: '',
      imageUrl: ''
    };
  }

  editProduct(product: Product): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentProduct = { ...product };
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.toastr.success('Product deleted successfully');
          this.loadProducts();
        },
        error: () => this.toastr.error('Failed to delete product')
      });
    }
  }

  saveProduct(): void {
    if (this.isEditing) {
      this.productService.updateProduct(this.currentProduct.id, this.currentProduct).subscribe({
        next: () => {
          this.toastr.success('Product updated successfully');
          this.showForm = false;
          this.loadProducts();
        },
        error: () => this.toastr.error('Failed to update product')
      });
    } else {
      this.productService.createProduct(this.currentProduct).subscribe({
        next: () => {
          this.toastr.success('Product created successfully');
          this.showForm = false;
          this.loadProducts();
        },
        error: () => this.toastr.error('Failed to create product')
      });
    }
  }
}
