import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/">
          <span class="text-primary">Ang</span><span class="text-danger">Net</span> <span class="text-secondary">Shop</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex mx-auto my-2 my-lg-0 w-50" (ngSubmit)="search()">
            <div class="input-group">
              <select class="form-select" style="max-width: 150px;" [(ngModel)]="category" name="category">
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
              </select>
              <input class="form-control" type="search" placeholder="Search for anything" aria-label="Search" [(ngModel)]="searchTerm" name="searchTerm">
              <button class="btn btn-primary" type="submit">Search</button>
            </div>
          </form>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li class="nav-item">
              <a class="nav-link" routerLink="/products">Shop</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/cart">
                <i class="fa fa-shopping-cart fa-lg"></i>
                <span class="badge bg-danger rounded-pill ms-1" *ngIf="cartCount > 0">{{ cartCount }}</span>
              </a>
            </li>
            <ng-container *ngIf="!isLoggedIn; else loggedIn">
              <li class="nav-item ms-3">
                <a class="btn btn-outline-primary btn-sm" routerLink="/login">Sign in</a>
              </li>
              <li class="nav-item ms-2">
                <a class="btn btn-primary btn-sm" routerLink="/signup">Register</a>
              </li>
            </ng-container>
            <ng-template #loggedIn>
              <li class="nav-item dropdown ms-3">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                  Hi, {{ userName }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" routerLink="/admin" *ngIf="isAdmin">Admin Panel</a></li>
                  <li><a class="dropdown-item" href="#">My Orders</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" (click)="logout()" style="cursor: pointer">Sign out</a></li>
                </ul>
              </li>
            </ng-template>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand { font-size: 1.5rem; }
    .input-group .form-select { border-right: none; }
    .input-group .form-control { border-left: none; }
  `]
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  userName = '';
  cartCount = 0;
  searchTerm = '';
  category = '';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user?.fullName || 'User';
      this.isAdmin = user?.role === 'Admin';
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  search(): void {
    this.router.navigate(['/'], { queryParams: { search: this.searchTerm, category: this.category } });
  }
}
