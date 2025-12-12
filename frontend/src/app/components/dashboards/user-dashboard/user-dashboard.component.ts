import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';
import { OrderService, Order } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  stats: any = {};
  recentOrders: Order[] = [];
  user: any = null;

  constructor(
    private dashboardService: DashboardService,
    private orderService: OrderService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadStats();
    this.loadOrders();
  }

  loadStats() {
    this.dashboardService.getUserStats().subscribe({
      next: (data: any) => this.stats = data,
      error: (err: any) => console.error('Error loading stats', err)
    });
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (orders: Order[]) => {
        // Sort by date desc and take top 5
        this.recentOrders = orders.sort((a: any, b: any) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, 5);
      },
      error: (err: any) => console.error('Error loading orders', err)
    });
  }
}
