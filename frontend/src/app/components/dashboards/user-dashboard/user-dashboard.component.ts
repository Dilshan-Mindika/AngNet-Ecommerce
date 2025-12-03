import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { OrderService, Order } from '../../../services/order.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2 class="mb-4">My Dashboard</h2>
      
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title fw-bold">My Profile</h5>
              <p class="card-text"><strong>Name:</strong> {{ user?.fullName }}</p>
              <p class="card-text"><strong>Email:</strong> {{ user?.email }}</p>
              <p class="card-text"><strong>Role:</strong> <span class="badge bg-info">{{ user?.role }}</span></p>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title fw-bold mb-3">My Orders</h5>
              <div *ngIf="orders.length === 0" class="alert alert-info">
                You haven't placed any orders yet.
              </div>
              <div class="table-responsive" *ngIf="orders.length > 0">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let order of orders">
                      <td>#{{ order.id }}</td>
                      <td>{{ order.orderDate | date:'mediumDate' }}</td>
                      <td>\${{ order.totalPrice }}</td>
                      <td>
                        <span [class.text-success]="order.orderStatus === 'Shipped'" 
                              [class.text-warning]="order.orderStatus === 'Pending'"
                              [class.text-danger]="order.orderStatus === 'Cancelled'">
                          {{ order.orderStatus }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class UserDashboardComponent implements OnInit {
  user: any;
  orders: Order[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadOrders();
  }

  loadOrders(): void {
    // Assuming OrderService has a method to get orders for the current user
    // If not, we might need to implement it or use the existing one if it filters by user on backend
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }
}
