import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
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
      next: (data) => this.stats = data,
      error: (err) => console.error('Error loading stats', err)
    });
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        // Sort by date desc and take top 10
        this.recentOrders = orders.slice(0, 10);
      },
      error: (err) => console.error('Error loading orders', err)
    });
  }
}
