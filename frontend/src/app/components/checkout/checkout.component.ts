import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <h2>Checkout</h2>
      <div class="row">
        <div class="col-md-6">
          <form (ngSubmit)="placeOrder()">
            <div class="mb-3">
              <label for="shippingAddress" class="form-label">Shipping Address</label>
              <textarea class="form-control" id="shippingAddress" [(ngModel)]="shippingAddress" name="shippingAddress" rows="3" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-100">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CheckoutComponent {
  shippingAddress = '';
  private apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient, private router: Router) { }

  placeOrder(): void {
    const orderDto = { shippingAddress: this.shippingAddress };
    this.http.post(this.apiUrl, orderDto).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Failed to place order.');
        console.error(err);
      }
    });
  }
}
