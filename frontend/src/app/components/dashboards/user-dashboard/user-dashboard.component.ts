import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';
import { OrderService, Order } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink, SidebarComponent],
    template: `
    <app-sidebar></app-sidebar>
    <div class="main-content" style="margin-left: 280px; background-color: #f3f4f6; min-height: 100vh;">
        <div class="container-fluid pt-5 px-5 pb-3">
            <div class="d-flex justify-content-between align-items-center mb-5">
                <div>
                     <h1 class="fw-bold mb-2 text-dark display-6">Welcome back, {{ user?.fullName }}!</h1>
                     <p class="text-muted mb-0">Good {{ getTimeOfDay() }}. Here is what's happening with your account.</p>
                </div>
                 <a routerLink="/" class="btn btn-outline-primary shadow-sm px-4 py-2 rounded-3 fw-medium"><i class="fa fa-shopping-bag me-2"></i>Continue Shopping</a>
            </div>

            <!-- Active Order Tracking (Enhanced) -->
             <div class="card border-0 shadow mb-5 rounded-4 overflow-hidden" *ngIf="recentOrders.length > 0 && recentOrders[0].orderStatus !== 'Delivered' && recentOrders[0].orderStatus !== 'Cancelled'">
                <div class="card-header bg-white py-4 border-bottom border-light">
                    <div class="d-flex justify-content-between align-items-center">
                         <h5 class="mb-0 fw-bold text-dark"><i class="fa fa-truck me-3 text-primary"></i>Order #{{ recentOrders[0].id }} In Progress</h5>
                         <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">Expected Delivery: Soon</span>
                    </div>
                </div>
                <div class="card-body p-5 bg-white">
                     <div class="position-relative mx-auto" style="max-width: 800px;">
                        <div class="progress bg-light" style="height: 6px;">
                            <div class="progress-bar bg-gradient-primary" role="progressbar" 
                                [style.width]="getOrderProgress(recentOrders[0].orderStatus)" 
                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"
                                style="transition: width 1s ease; background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);"></div>
                        </div>
                        
                        <!-- Steps -->
                        <div class="position-absolute top-0 start-0 translate-middle text-center" style="margin-top: -10px;">
                             <div class="btn btn-primary rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-2" style="width: 40px; height: 40px;"><i class="fa fa-check"></i></div>
                             <small class="fw-bold text-dark d-block">Ordered</small>
                             <small class="text-muted" style="font-size: 0.75rem;">Received</small>
                        </div>
                        
                         <div class="position-absolute top-0 start-50 translate-middle text-center" style="margin-top: -10px;">
                             <div class="btn rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-2" 
                                [ngClass]="getStepClass(recentOrders[0].orderStatus, 'Shipped')" style="width: 40px; height: 40px;">
                                <i class="fa fa-dropbox" [ngClass]="{'text-white': isStepActive(recentOrders[0].orderStatus, 'Shipped')}"></i>
                             </div>
                             <small class="fw-bold text-dark d-block">Shipped</small>
                             <small class="text-muted" style="font-size: 0.75rem;">On the way</small>
                        </div>

                         <div class="position-absolute top-0 start-100 translate-middle text-center" style="margin-top: -10px;">
                             <div class="btn rounded-circle shadow-sm d-flex align-items-center justify-content-center mb-2" 
                                 [ngClass]="getStepClass(recentOrders[0].orderStatus, 'Delivered')" style="width: 40px; height: 40px;">
                                <i class="fa fa-home" [ngClass]="{'text-white': isStepActive(recentOrders[0].orderStatus, 'Delivered')}"></i>
                             </div>
                             <small class="fw-bold text-dark d-block">Delivered</small>
                             <small class="text-muted" style="font-size: 0.75rem;">Arrived</small>
                         </div>
                    </div>
                </div>
            </div>

            <!-- Stats -->
            <div class="row g-4 mb-5">
                <div class="col-md-6">
                    <div class="card h-100 border-0 shadow-sm p-3">
                        <div class="card-body d-flex align-items-center">
                            <div class="icon-shape bg-primary bg-opacity-10 text-primary rounded-4 px-3 py-3 me-4 shadow-sm" style="width: 64px; height: 64px; display: flex; align-items: center; justify-content: center;">
                                 <i class="fa fa-shopping-bag fa-2x"></i>
                            </div>
                            <div>
                                <h6 class="text-muted text-uppercase fw-bold mb-1">Total Orders</h6>
                                <h2 class="fw-bold mb-0 display-6">{{ stats.totalOrders || 0 }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card h-100 border-0 shadow-sm p-3">
                         <div class="card-body d-flex align-items-center">
                            <div class="icon-shape bg-success bg-opacity-10 text-success rounded-4 px-3 py-3 me-4 shadow-sm" style="width: 64px; height: 64px; display: flex; align-items: center; justify-content: center;">
                                 <i class="fa fa-check-circle fa-2x"></i>
                            </div>
                            <div>
                                <h6 class="text-muted text-uppercase fw-bold mb-1">Completed</h6>
                                <h2 class="fw-bold mb-0 display-6">{{ stats.completedOrders || 0 }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order History -->
            <div class="card border-0 shadow-sm p-3">
                <div class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 fw-bold text-dark">My Order History</h5>
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
                                    <td class="ps-4 py-3 fw-bold text-primary rounded-start">#{{ order.id }}</td>
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
                                        <button class="btn btn-sm btn-white text-dark border fw-medium">View Details</button>
                                    </td>
                                </tr>
                                 <tr *ngIf="recentOrders.length === 0">
                                    <td colspan="5" class="text-center py-5 text-muted">You haven't placed any orders yet.</td>
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

    getTimeOfDay(): string {
        const hour = new Date().getHours();
        if (hour < 12) return 'morning';
        if (hour < 18) return 'afternoon';
        return 'evening';
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
                this.recentOrders = orders.sort((a: any, b: any) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, 5);
            },
            error: (err: any) => console.error('Error loading orders', err)
        });
    }

    getOrderProgress(status: string): string {
        if (status === 'Pending') return '0%';
        if (status === 'Shipped') return '50%';
        if (status === 'Delivered') return '100%';
        return '0%';
    }

    // Check if >= step for styling background (completed step)
    getStepClass(currentStatus: string, stepStatus: string): string {
        const statuses = ['Pending', 'Shipped', 'Delivered'];
        const currentIdx = statuses.indexOf(currentStatus);
        const stepIdx = statuses.indexOf(stepStatus);

        if (currentIdx >= stepIdx) {
            return 'btn-primary text-white';
        }
        return 'btn-light text-muted border';
    }

    // Exact check for active icon color if needed
    isStepActive(currentStatus: string, stepStatus: string): boolean {
        const statuses = ['Pending', 'Shipped', 'Delivered'];
        const currentIdx = statuses.indexOf(currentStatus);
        const stepIdx = statuses.indexOf(stepStatus);
        return currentIdx >= stepIdx;
    }
}
