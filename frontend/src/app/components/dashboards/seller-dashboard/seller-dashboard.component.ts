import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';
import { OrderService, Order } from '../../../services/order.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit {
  stats: any = {};
  recentOrders: Order[] = [];

  constructor(
    private dashboardService: DashboardService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadStats();
    this.loadOrders();
  }

  loadStats() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data: any) => this.stats = data,
      error: (err: any) => console.error('Error loading stats', err)
    });
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (orders: Order[]) => {
        // Sort by date desc and take top 10
        this.recentOrders = orders.slice(0, 10);
      },
      error: (err: any) => console.error('Error loading orders', err)
    });
  }
}
