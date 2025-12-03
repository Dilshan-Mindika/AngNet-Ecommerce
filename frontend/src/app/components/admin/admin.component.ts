import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { OrderService, Order } from '../../services/order.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2>Admin Dashboard</h2>
      
      <ul class="nav nav-tabs mb-4">
        <li class="nav-item">
          <a class="nav-link" [class.active]="activeTab === 'products'" (click)="activeTab = 'products'" style="cursor: pointer">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [class.active]="activeTab === 'orders'" (click)="activeTab = 'orders'" style="cursor: pointer">Orders</a>
        </li>
      </ul>

      <div *ngIf="activeTab === 'products'">
        <div class="card mb-4">
          <div class="card-header">Add New Product</div>
          <div class="card-body">
            <form (ngSubmit)="addProduct()">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Name</label>
                  <input type="text" class="form-control" [(ngModel)]="newProduct.name" name="name" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Category</label>
                  <input type="text" class="form-control" [(ngModel)]="newProduct.category" name="category" required>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Price</label>
                  <input type="number" class="form-control" [(ngModel)]="newProduct.price" name="price" required>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Stock</label>
                  <input type="number" class="form-control" [(ngModel)]="newProduct.stockQuantity" name="stockQuantity" required>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Image URL</label>
                  <input type="text" class="form-control" [(ngModel)]="newProduct.imageUrl" name="imageUrl">
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Description</label>
                  <textarea class="form-control" [(ngModel)]="newProduct.description" name="description"></textarea>
                </div>
              </div>
              <button type="submit" class="btn btn-success">Add Product</button>
            </form>
          </div>
        </div>

        <h3>Manage Products</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>\${{ product.price }}</td>
              <td>{{ product.stockQuantity }}</td>
              <td>
                <button class="btn btn-danger btn-sm" (click)="deleteProduct(product.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="activeTab === 'orders'">
        <h3>Manage Orders</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders">
              <td>{{ order.id }}</td>
              <td>{{ order.user?.fullName || order.userId }}</td>
              <td>{{ order.orderDate | date:'short' }}</td>
              <td>\${{ order.totalPrice }}</td>
              <td>
                <span [class.text-success]="order.orderStatus === 'Shipped'" [class.text-warning]="order.orderStatus === 'Pending'">
                  {{ order.orderStatus }}
                </span>
              </td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary" (click)="updateOrderStatus(order.id, 'Processing')">Processing</button>
                  <button class="btn btn-sm btn-outline-success" (click)="updateOrderStatus(order.id, 'Shipped')">Shipped</button>
                  <button class="btn btn-sm btn-outline-danger" (click)="updateOrderStatus(order.id, 'Cancelled')">Cancel</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class AdminComponent implements OnInit {
  activeTab = 'products';
  products: Product[] = [];
  orders: Order[] = [];
  newProduct: any = {
    name: '',
    description: '',
    price: 0,
    category: '',
    stockQuantity: 0,
    imageUrl: ''
  };

  private apiUrl = 'http://localhost:5000/api/products';

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => this.orders = data,
      error: () => this.toastr.error('Failed to load orders')
    });
  }

  addProduct(): void {
    this.http.post(this.apiUrl, this.newProduct).subscribe({
      next: () => {
        this.toastr.success('Product added successfully');
        this.loadProducts();
        this.newProduct = { name: '', description: '', price: 0, category: '', stockQuantity: 0, imageUrl: '' };
      },
      error: (err) => {
        this.toastr.error('Failed to add product. Ensure you are Admin.');
        console.error(err);
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.toastr.success('Product deleted successfully');
          this.loadProducts();
        },
        error: (err) => {
          this.toastr.error('Failed to delete product. Ensure you are Admin.');
          console.error(err);
        }
      });
    }
  }

  updateOrderStatus(id: number, status: string): void {
    this.orderService.updateOrderStatus(id, status).subscribe({
      next: () => {
        this.toastr.success(`Order status updated to ${status}`);
        this.loadOrders();
      },
      error: () => this.toastr.error('Failed to update order status')
    });
  }
}
