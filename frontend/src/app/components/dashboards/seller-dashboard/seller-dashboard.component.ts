import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';
import { OrderService, Order } from '../../../services/order.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent, BaseChartDirective],
  template: `
    <app-sidebar></app-sidebar>
    <div class="main-content" style="margin-left: 280px; background-color: #f3f4f6; min-height: 100vh;">
        <div class="container-fluid pt-5 px-5 pb-3">
             <div class="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 class="fw-bold mb-2 text-dark display-6">Seller Hub</h1>
                    <p class="text-muted mb-0">Good {{ getTimeOfDay() }}, Seller. Manage your business here.</p>
                </div>
                 <a routerLink="/admin/products/new" class="btn btn-primary shadow-sm px-4 py-2 rounded-3"><i class="fa fa-plus me-2"></i>Add New Product</a>
            </div>

            <!-- Stats -->
            <div class="row g-4 mb-5">
                <div class="col-md-3">
                    <div class="card h-100 border-0 p-3">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div class="d-flex justify-content-between align-items-start mb-4">
                                <div class="icon-shape bg-primary bg-opacity-10 text-primary rounded-4 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                    <i class="fa fa-cube fs-5"></i>
                                </div>
                            </div>
                            <div>
                                <h2 class="fw-bold mb-1">{{ stats.totalProducts || 0 }}</h2>
                                <h6 class="text-muted small text-uppercase fw-bold mb-0">My Products</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card h-100 border-0 p-3">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div class="d-flex justify-content-between align-items-start mb-4">
                                <div class="icon-shape bg-success bg-opacity-10 text-success rounded-4 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                    <i class="fa fa-check-circle fs-5"></i>
                                </div>
                                <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2">Success</span>
                            </div>
                            <div>
                                <h2 class="fw-bold mb-1">{{ stats.totalOrders || 0 }}</h2>
                                <h6 class="text-muted small text-uppercase fw-bold mb-0">Total Sales</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                     <div class="card h-100 border-0 p-3">
                         <div class="card-body d-flex flex-column justify-content-between">
                            <div class="d-flex justify-content-between align-items-start mb-4">
                                <div class="icon-shape bg-warning bg-opacity-10 text-warning rounded-4 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                    <i class="fa fa-dollar fs-5"></i>
                                </div>
                            </div>
                            <div>
                                <h2 class="fw-bold mb-1">\${{ stats.totalRevenue || 0 | number:'1.2-2' }}</h2>
                                <h6 class="text-muted small text-uppercase fw-bold mb-0">Total Revenue</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                     <div class="card h-100 border-0 p-3">
                         <div class="card-body d-flex flex-column justify-content-between">
                            <div class="d-flex justify-content-between align-items-start mb-4">
                                <div class="icon-shape bg-info bg-opacity-10 text-info rounded-4 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                    <i class="fa fa-clock-o fs-5"></i>
                                </div>
                                 <span class="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2">Action</span>
                            </div>
                            <div>
                                <h2 class="fw-bold mb-1">{{ stats.pendingOrders || 0 }}</h2>
                                <h6 class="text-muted small text-uppercase fw-bold mb-0">Pending Orders</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts -->
            <div class="row g-4 mb-5">
                <div class="col-md-12">
                     <div class="card border-0 shadow-sm h-100 p-4">
                        <div class="card-header bg-white border-0 py-3 mb-2">
                             <div class="d-flex justify-content-between align-items-center">
                                <h5 class="mb-0 fw-bold text-dark">Sales Performance</h5>
                                <button class="btn btn-sm btn-light border"><i class="fa fa-download me-2"></i>Export Report</button>
                             </div>
                        </div>
                        <div class="card-body px-0" style="height: 350px;">
                              <canvas baseChart
                                [data]="lineChartData"
                                [options]="lineChartOptions"
                                [type]="'line'">
                            </canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Orders Table -->
            <div class="card border-0 p-3">
                <div class="card-header bg-white border-0 py-3 mb-2">
                    <h5 class="mb-0 fw-bold text-dark">Recent Orders</h5>
                </div>
                 <div class="card-body p-0">
                    <div class="table-responsive">
                         <table class="table table-hover align-middle" style="border-collapse: separate; border-spacing: 0 0.5rem;">
                             <thead class="text-secondary small text-uppercase">
                                <tr>
                                    <th class="border-0 ps-4 font-weight-bold">Order ID</th>
                                    <th class="border-0 font-weight-bold">Date</th>
                                    <th class="border-0 font-weight-bold">Total</th>
                                    <th class="border-0 font-weight-bold">Status</th>
                                    <th class="border-0 text-end pe-4 font-weight-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let order of recentOrders" class="bg-white shadow-sm-hover rounded-3">
                                    <td class="ps-4 py-3 fw-bold text-dark rounded-start">#{{ order.id }}</td>
                                    <td class="py-3 text-secondary">{{ order.orderDate | date:'mediumDate' }}</td>
                                    <td class="py-3 fw-bold">\${{ order.totalPrice }}</td>
                                    <td class="py-3">
                                         <span class="badge rounded-pill px-3 py-2" [ngClass]="{
                                            'bg-success bg-opacity-10 text-success': order.orderStatus === 'Delivered',
                                            'bg-warning bg-opacity-10 text-warning': order.orderStatus === 'Pending',
                                            'bg-info bg-opacity-10 text-info': order.orderStatus === 'Shipped',
                                            'bg-danger bg-opacity-10 text-danger': order.orderStatus === 'Cancelled'
                                        }">{{ order.orderStatus }}</span>
                                    </td>
                                    <td class="text-end pe-4 py-3 rounded-end">
                                        <button class="btn btn-sm btn-white text-primary fw-medium border">Details</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [`
        .btn-white { background: #fff; border: 1px solid #eee; }
        .btn-white:hover { background: #f9fafb; border-color: #e5e7eb; }
        .shadow-sm-hover:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transform: translateY(-1px); transition: all 0.2s; }
  `]
})
export class SellerDashboardComponent implements OnInit {
  stats: any = {};
  recentOrders: Order[] = [];

  // Line Chart (Performance)
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Sales Revenue',
        fill: true,
        tension: 0.4,
        borderColor: '#10b981', // Emerald 500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#10b981'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#064e3b',
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'Inter' } } },
      y: { border: { display: false }, grid: { color: '#f3f4f6' }, ticks: { font: { family: 'Inter' }, callback: (value) => '$' + value } }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadStats();
    this.loadOrders();
    this.loadChartData();
  }

  getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
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
        // Filter for seller? Currently API returns all for simplicity in demo
        this.recentOrders = orders.slice(0, 10);
      },
      error: (err: any) => console.error('Error loading orders', err)
    });
  }

  loadChartData() {
    this.dashboardService.getChartData().subscribe({
      next: (data: any) => {
        if (data.sales && data.sales.length > 0) {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const labels = data.sales.map((s: any) => months[s.month - 1]);
          const values = data.sales.map((s: any) => s.totalSales);

          this.lineChartData.labels = labels;
          this.lineChartData.datasets[0].data = values;
        }
      },
      error: (err: any) => console.error('Error loading chart data', err)
    });
  }
}
