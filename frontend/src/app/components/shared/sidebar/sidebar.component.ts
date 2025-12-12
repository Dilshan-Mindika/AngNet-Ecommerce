import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar d-flex flex-column flex-shrink-0 text-white shadow-lg" 
         style="width: 280px; height: 100vh; position: fixed; top: 0; left: 0; background: linear-gradient(180deg, var(--sidebar-bg-from) 0%, var(--sidebar-bg-to) 100%); z-index: 1000;">
      
      <!-- Brand Section -->
      <a routerLink="/" class="d-flex align-items-center p-4 mb-3 text-white text-decoration-none border-bottom border-white border-opacity-10">
        <div class="icon-shape bg-white text-primary rounded-3 d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
             <i class="fa fa-shopping-bag fs-5"></i>
        </div>
        <div>
            <h5 class="fw-bold mb-0">AngNet Shop</h5>
            <small class="text-white text-opacity-50" style="font-size: 0.75rem;">Premium Dashboard</small>
        </div>
      </a>

      <!-- Navigation -->
      <ul class="nav nav-pills flex-column mb-auto px-3 gap-2 inner-nav">
        <li class="nav-item">
          <a [routerLink]="getDashboardLink()" class="nav-link text-white d-flex align-items-center px-3 py-2 rounded-3" 
             routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <i class="fa fa-tachometer w-25 text-center"></i> 
            <span class="fw-medium">Dashboard</span>
          </a>
        </li>

        <!-- Admin Links -->
        <ng-container *ngIf="isAdmin">
          <li class="nav-item">
            <small class="text-white text-opacity-50 text-uppercase fw-bold px-3 mt-4 mb-2 d-block" style="font-size: 0.7rem; letter-spacing: 1px;">Management</small>
          </li>
          <li>
            <a routerLink="/admin/products" class="nav-link text-white d-flex align-items-center px-3 py-2 rounded-3" routerLinkActive="active">
              <i class="fa fa-box w-25 text-center"></i> <span class="fw-medium">Products</span>
            </a>
          </li>
          <li>
            <a routerLink="/admin/users" class="nav-link text-white d-flex align-items-center px-3 py-2 rounded-3" routerLinkActive="active">
              <i class="fa fa-users w-25 text-center"></i> <span class="fw-medium">Users</span>
            </a>
          </li>
        </ng-container>

        <!-- Seller Links -->
        <ng-container *ngIf="isSeller">
           <li class="nav-item">
            <small class="text-white text-opacity-50 text-uppercase fw-bold px-3 mt-4 mb-2 d-block" style="font-size: 0.7rem; letter-spacing: 1px;">Seller Hub</small>
          </li>
          <li>
            <a routerLink="/admin/products" class="nav-link text-white d-flex align-items-center px-3 py-2 rounded-3" routerLinkActive="active">
              <i class="fa fa-list w-25 text-center"></i> <span class="fw-medium">My Products</span>
            </a>
          </li>
          <li>
            <a routerLink="/admin/products/new" class="nav-link text-white d-flex align-items-center px-3 py-2 rounded-3" routerLinkActive="active">
              <i class="fa fa-plus-circle w-25 text-center"></i> <span class="fw-medium">Add Product</span>
            </a>
          </li>
        </ng-container>

        <!-- Customer Links -->
        <ng-container *ngIf="isUser">
           <li class="nav-item">
            <small class="text-white text-opacity-50 text-uppercase fw-bold px-3 mt-4 mb-2 d-block" style="font-size: 0.7rem; letter-spacing: 1px;">My Account</small>
          </li>
          <li>
            <a routerLink="/products" class="nav-link text-white d-flex align-items-center px-3 py-2 rounded-3">
              <i class="fa fa-search w-25 text-center"></i> <span class="fw-medium">Browse Shop</span>
            </a>
          </li>
          <li>
            <a routerLink="/cart" class="nav-link text-white d-flex align-items-center px-3 py-2 rounded-3">
              <i class="fa fa-shopping-cart w-25 text-center"></i> <span class="fw-medium">My Cart</span>
            </a>
          </li>
        </ng-container>
      </ul>

      <!-- User Profile Dropdown (Bottom) -->
      <div class="mt-auto p-3 border-top border-white border-opacity-10 bg-black bg-opacity-10">
        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle-custom" (click)="logout($event)">
          <img src="https://ui-avatars.com/api/?name={{ userName }}&background=6366f1&color=fff" alt="" width="40" height="40" class="rounded-circle me-3 shadow-sm border border-2 border-white border-opacity-25">
          <div class="flex-grow-1 overflow-hidden">
             <div class="fw-bold text-truncate">{{ userName }}</div>
             <small class="text-white text-opacity-75 d-block">Sign out</small>
          </div>
          <i class="fa fa-sign-out text-white text-opacity-50"></i>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .nav-link {
        transition: all 0.2s ease;
        color: rgba(255,255,255,0.7) !important;
    }
    .nav-link:hover {
        background-color: rgba(255,255,255,0.1);
        color: #fff !important;
        transform: translateX(4px);
    }
    .nav-link.active {
        background-color: var(--primary-color) !important;
        background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%) !important;
        color: #fff !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .inner-nav::-webkit-scrollbar {
        width: 4px;
    }
    .inner-nav::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.2); 
    }
  `]
})
export class SidebarComponent implements OnInit {
  isAdmin = false;
  isSeller = false;
  isUser = false;
  userName = 'User';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.isAdmin = user.role === 'Admin';
        this.isSeller = user.role === 'Seller';
        this.isUser = user.role === 'Customer';
        this.userName = user.fullName || 'User';
      }
    });
  }

  getDashboardLink(): string {
    if (this.isAdmin) return '/admin/dashboard';
    if (this.isSeller) return '/seller/dashboard';
    return '/user/dashboard';
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
