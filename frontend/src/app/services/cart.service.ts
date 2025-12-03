import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  id: number;
  productId: number;
  product?: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart';
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCart(): void {
    this.http.get<CartItem[]>(this.apiUrl).subscribe(items => {
      this.cartSubject.next(items);
    });
  }

  addToCart(productId: number, quantity: number): Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrl, { productId, quantity }).pipe(
      tap(() => this.getCart())
    );
  }

  updateQuantity(id: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, { quantity }).pipe(
      tap(() => this.getCart())
    );
  }

  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getCart())
    );
  }
}
