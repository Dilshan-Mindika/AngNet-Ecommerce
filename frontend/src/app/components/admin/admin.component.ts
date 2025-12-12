import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { OrderService, Order } from '../../services/order.service';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, RouterLink, SidebarComponent, BaseChartDirective],
    template: `
    <app-sidebar></app-sidebar>
    <div class="main-content" style="margin-left: 280px; background-color: #f3f4f6; min-height: 100vh;">
        <!-- Header / Welcome Section -->
        <div class="container-fluid pt-5 px-5 pb-3"> <!-- Added top padding -->
            <div class="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 class="fw-bold mb-2 text-dark display-6">Dashboard</h1>
                    <p class="text-muted mb-0">Good {{ getTimeOfDay() }}, Admin. Here's what's happening today.</p>
                </div>
                <div class="d-flex gap-3">
                    <button class="btn btn-white shadow-sm rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;"><i class="fa fa-search text-secondary"></i></button>
                    <button class="btn btn-white shadow-sm rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;"><i class="fa fa-bell text-secondary"></i></button>
                </div>
            </div>

            <!-- Stats Cards -->
            <div class="row g-4 mb-5">
                <div class="col-md-3">
                    <div class="card h-100 border-0 p-3">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div class="d-flex justify-content-between align-items-start mb-4">
                                <div class="icon-shape bg-primary bg-opacity-10 text-primary rounded-4 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                    <i class="fa fa-dollar fs-5"></i>
                                </div>
                                <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2">+12%</span>
                            </div>
                            <div>
                                <h2 class="fw-bold mb-1">\${{ stats.totalRevenue || 0 | number:'1.2-2' }}</h2>
                                <h6 class="text-muted small text-uppercase fw-bold mb-0">Total Revenue</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ... other cards similar style ... -->
                <div class="col-md-3">
                    <div class="card h-100 border-0 p-3">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div class="d-flex justify-content-between align-items-start mb-4">
                                <div class="icon-shape bg-info bg-opacity-10 text-info rounded-4 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                    <i class="fa fa-shopping-bag fs-5"></i>
                                </div>
                                <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">New</span>
                            </div>
                            <div>
                                <h2 class="fw-bold mb-1">{{ stats.totalOrders || 0 }}</h2>
                                <h6 class="text-muted small text-uppercase fw-bold mb-0">Total Orders</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                  <div class="card h-100 border-0 p-3">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div class="d-flex justify-content-between align-items-start mb-4">
                                <div class="icon-shape bg-warning bg-opacity-10 text-warning rounded-4 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                    <i class="fa fa-users fs-5"></i>
                                </div>
                            </div>
                            <div>
                                <h2 class="fw-bold mb-1">{{ stats.totalUsers || 0 }}</h2>
                                <h6 class="text-muted small text-uppercase fw-bold mb-0">Active Users</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                   <div class="card h-100 border-0 p-3">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div class="d-flex justify-content-between align-items-start mb-4">
                                <div class="icon-shape bg-danger bg-opacity-10 text-danger rounded-4 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                    <i class="fa fa-clock-o fs-5"></i>
                                </div>
                                <span class="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2">Urgent</span>
                            </div>
                            <div>
                                <h2 class="fw-bold mb-1">{{ stats.pendingOrders || 0 }}</h2>
                                <h6 class="text-muted small text-uppercase fw-bold mb-0">Pending Orders</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="row g-4 mb-5">
                <div class="col-lg-8">
                    <div class="card border-0 h-100 p-3">
                        <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center mb-3">
                            <h5 class="mb-0 fw-bold text-dark">Revenue Overview</h5>
                            <select class="form-select form-select-sm w-auto border-0 bg-light fw-bold text-secondary">
                                <option>Last 6 Months</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div class="card-body px-0"> <!-- Removed padding for full width chart if needed, or keep -->
                             <canvas baseChart
                                [data]="barChartData"
                                [options]="barChartOptions"
                                [type]="'bar'"
                                style="max-height: 320px;">
                            </canvas>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                     <div class="card border-0 h-100 p-3">
                         <div class="card-header bg-white border-0 mb-3">
                            <h5 class="mb-0 fw-bold text-dark">Order Status</h5>
                        </div>
                        <div class="card-body d-flex justify-content-center align-items-center position-relative">
                           <div style="width: 100%; height: 300px;">
                                <canvas baseChart
                                    [data]="pieChartData"
                                    [options]="pieChartOptions"
                                    [type]="'pie'">
                                </canvas>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Orders -->
            <div class="card border-0 p-3">
                <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center mb-4">
                    <h5 class="mb-0 fw-bold text-dark">Recent Transactions</h5>
                    <a routerLink="/admin/orders" class="btn btn-sm btn-light text-primary fw-bold">View All Transactions</a>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle" style="border-collapse: separate; border-spacing: 0 0.5rem;">
                            <thead class="text-secondary small text-uppercase">
                                <tr>
                                    <th class="border-0 ps-4 font-weight-bold">Order ID</th>
                                    <th class="border-0 font-weight-bold">Customer</th>
                                    <th class="border-0 font-weight-bold">Date</th>
                                    <th class="border-0 font-weight-bold">Total</th>
                                    <th class="border-0 font-weight-bold">Status</th>
                                    <th class="border-0 text-end pe-4 font-weight-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let order of recentOrders" class="bg-white shadow-sm-hover rounded-3">
                                    <td class="ps-4 py-3 fw-bold text-dark rounded-start">#{{ order.id }}</td>
                                    <td class="py-3">
                                        <div class="d-flex align-items-center">
                                            <div class="avatar bg-light-primary text-primary rounded-circle me-3 d-flex align-items-center justify-content-center fw-bold" style="width: 36px; height: 36px; background-color: #eef2ff;">
                                                {{ order.user?.fullName?.charAt(0) || 'U' }}
                                            </div>
                                            <div>
                                                <div class="fw-bold text-dark">{{ order.user?.fullName }}</div>
                                                <div class="small text-muted">Customer</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-3 text-secondary">{{ order.orderDate | date:'mediumDate' }}</td>
                                    <td class="py-3 fw-bold text-dark">\${{ order.totalPrice }}</td>
                                    <td class="py-3">
                                        <span class="badge rounded-pill px-3 py-2" [ngClass]="{
                                            'bg-success bg-opacity-10 text-success': order.orderStatus === 'Delivered',
                                            'bg-warning bg-opacity-10 text-warning': order.orderStatus === 'Pending',
                                            'bg-info bg-opacity-10 text-info': order.orderStatus === 'Shipped',
                                            'bg-danger bg-opacity-10 text-danger': order.orderStatus === 'Cancelled'
                                        }">{{ order.orderStatus }}</span>
                                    </td>
                                    <td class="text-end pe-4 py-3 rounded-end">
                                        <button class="btn btn-icon btn-sm btn-ghost-secondary"><i class="fa fa-ellipsis-v"></i></button>
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
        .btn-ghost-secondary { color: #6b7280; border: none; background: transparent; }
        .btn-ghost-secondary:hover { background: #f3f4f6; color: #111827; }
        .shadow-sm-hover:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); transform: translateY(-1px); transition: all 0.2s; }
    `]
})
export class AdminComponent implements OnInit {
    stats: any = {};
    recentOrders: Order[] = [];

    // Charts Config (Bar)
    public barChartData: ChartConfiguration<'bar'>['data'] = {
        labels: [],
        datasets: [
            {
                data: [],
                label: 'Revenue',
                backgroundColor: '#6366f1',
                hoverBackgroundColor: '#4f46e5',
                borderRadius: 6,
                barThickness: 32
            }
        ]
    };
    public barChartOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e1b4b',
                padding: 12,
                cornerRadius: 8,
                titleFont: { family: 'Inter', size: 14 },
                bodyFont: { family: 'Inter', size: 14 }
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { family: 'Inter' } } },
            y: { border: { display: false }, grid: { color: '#f3f4f6' }, ticks: { font: { family: 'Inter' } } }
        }
    };

    // Charts Config (Pie)
    public pieChartData: ChartConfiguration<'pie'>['data'] = {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#f59e0b', '#06b6d4', '#10b981'], // Amber, Cyan, Emerald
            borderWidth: 0,
            hoverOffset: 4
        }]
    };
    public pieChartOptions: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { family: 'Inter' } } }
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
            next: (data) => this.stats = data,
            error: (err) => console.error('Error loading stats', err)
        });
    }

    loadOrders() {
        this.orderService.getAllOrders().subscribe({
            next: (orders) => {
                this.recentOrders = orders.slice(0, 10);
            },
            error: (err) => console.error('Error loading orders', err)
        });
    }

    loadChartData() {
        this.dashboardService.getChartData().subscribe({
            next: (data: any) => {
                // Sales Data (Bar Chart)
                if (data.sales && data.sales.length > 0) {
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const labels = data.sales.map((s: any) => months[s.month - 1]);
                    const values = data.sales.map((s: any) => s.totalSales);

                    this.barChartData.labels = labels;
                    this.barChartData.datasets[0].data = values;
                }

                // Status Data (Pie Chart)
                if (data.statusDistribution && data.statusDistribution.length > 0) {
                    const labels = data.statusDistribution.map((s: any) => s.status);
                    const values = data.statusDistribution.map((s: any) => s.count);
                    this.pieChartData.labels = labels;
                    this.pieChartData.datasets[0].data = values;
                }
            },
            error: (err) => console.error('Error loading chart data', err)
        });
    }
}
