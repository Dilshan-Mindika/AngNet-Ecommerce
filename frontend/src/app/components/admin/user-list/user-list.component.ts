import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>User Management</h2>
      </div>

      <div class="card shadow-sm">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="bg-light">
                <tr>
                  <th class="border-0">ID</th>
                  <th class="border-0">Name</th>
                  <th class="border-0">Email</th>
                  <th class="border-0">Role</th>
                  <th class="border-0">Created At</th>
                  <th class="border-0 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of users">
                  <td>#{{ user.id }}</td>
                  <td class="fw-bold">{{ user.fullName }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span [ngClass]="{
                      'badge bg-primary': user.role === 'Admin',
                      'badge bg-success': user.role === 'Seller',
                      'badge bg-secondary': user.role === 'Customer'
                    }">{{ user.role }}</span>
                  </td>
                  <td>{{ user.createdAt | date:'mediumDate' }}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-danger" (click)="deleteUser(user)">
                      <i class="fa fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
                 <tr *ngIf="users.length === 0">
                    <td colspan="6" class="text-center py-4">No users found.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: []
})
export class UserListComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe({
            next: (data) => this.users = data,
            error: (err) => {
                console.error('Error loading users', err);
                this.toastr.error('Failed to load users');
            }
        });
    }

    deleteUser(user: User): void {
        if (confirm(`Are you sure you want to delete user ${user.fullName}?`)) {
            this.userService.deleteUser(user.id).subscribe({
                next: () => {
                    this.toastr.success('User deleted successfully');
                    this.loadUsers();
                },
                error: (err) => {
                    console.error('Error deleting user', err);
                    this.toastr.error('Failed to delete user');
                }
            });
        }
    }
}
