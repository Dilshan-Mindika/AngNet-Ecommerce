import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-3">
              <h4 class="mb-0 fw-bold">{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h4>
            </div>
            <div class="card-body p-4">
              <form (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="name" class="form-label">Product Name</label>
                  <input type="text" class="form-control" id="name" [(ngModel)]="product.name" name="name" required>
                </div>

                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" rows="3" [(ngModel)]="product.description" name="description"></textarea>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="price" class="form-label">Price</label>
                    <div class="input-group">
                      <span class="input-group-text">$</span>
                      <input type="number" class="form-control" id="price" [(ngModel)]="product.price" name="price" required min="0">
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="stock" class="form-label">Stock Quantity</label>
                    <input type="number" class="form-control" id="stock" [(ngModel)]="product.stockQuantity" name="stockQuantity" required min="0">
                  </div>
                </div>

                <div class="mb-3">
                  <label for="category" class="form-label">Category</label>
                  <select class="form-select" id="category" [(ngModel)]="product.category" name="category" required>
                    <option value="" disabled>Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                <div class="mb-4">
                  <label for="imageUrl" class="form-label">Image URL</label>
                  <input type="text" class="form-control" id="imageUrl" [(ngModel)]="product.imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg">
                   <div class="mt-2" *ngIf="product.imageUrl">
                      <small class="text-muted d-block mb-1">Preview:</small>
                      <img [src]="product.imageUrl" alt="Preview" class="img-thumbnail" style="height: 100px;">
                   </div>
                </div>

                <div class="d-flex justify-content-end gap-2">
                  <a routerLink="/admin/products" class="btn btn-outline-secondary">Cancel</a>
                  <button type="submit" class="btn btn-primary px-4">{{ isEditMode ? 'Update Product' : 'Create Product' }}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: []
})
export class ProductFormComponent implements OnInit {
    product: Product = {
        id: 0,
        name: '',
        description: '',
        price: 0,
        category: '',
        stockQuantity: 0,
        imageUrl: ''
    };
    isEditMode = false;

    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.productService.getProduct(+id).subscribe({
                next: (data) => this.product = data,
                error: (err) => this.toastr.error('Failed to load product')
            });
        }
    }

    onSubmit(): void {
        if (this.isEditMode) {
            this.productService.updateProduct(this.product.id, this.product).subscribe({
                next: () => {
                    this.toastr.success('Product updated successfully');
                    this.router.navigate(['/admin/products']);
                },
                error: (err) => {
                    console.error(err);
                    this.toastr.error('Failed to update product');
                }
            });
        } else {
            this.productService.createProduct(this.product).subscribe({
                next: () => {
                    this.toastr.success('Product created successfully');
                    this.router.navigate(['/admin/products']);
                },
                error: (err) => {
                    console.error(err);
                    this.toastr.error('Failed to create product');
                }
            });
        }
    }
}
