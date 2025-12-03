import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-5">
      <h2>Shopping Cart</h2>
      <div *ngIf="cartItems.length === 0" class="alert alert-info">
        Your cart is empty. <a routerLink="/">Go shopping</a>
      </div>
      <div *ngIf="cartItems.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of cartItems">
              <td>{{ item.product?.name }}</td>
              <td>\${{ item.product?.price }}</td>
              <td>
                <input type="number" min="1" [value]="item.quantity" (change)="updateQuantity(item, $event)" class="form-control" style="width: 80px">
              </td>
              <td>\${{ (item.product?.price || 0) * item.quantity }}</td>
              <td>
                <button class="btn btn-danger btn-sm" (click)="removeItem(item.id)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-end">
          <h4>Total: \${{ getTotal() }}</h4>
        </div>
        <div class="d-flex justify-content-end mt-3">
          <a routerLink="/checkout" class="btn btn-success btn-lg">Proceed to Checkout</a>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
    this.cartService.getCart();
  }

  updateQuantity(item: CartItem, event: any): void {
    const quantity = Number(event.target.value);
    if (quantity > 0) {
      this.cartService.updateQuantity(item.id, quantity).subscribe();
    }
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id).subscribe();
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + ((item.product?.price || 0) * item.quantity), 0);
  }
}
