import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
    id: number;
    userId: number;
    orderDate: string;
    totalPrice: number;
    shippingAddress: string;
    orderStatus: string;
    orderItems: any[];
    user?: any;
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:5000/api/orders';

    constructor(private http: HttpClient) { }

    placeOrder(shippingAddress: string): Observable<Order> {
        return this.http.post<Order>(this.apiUrl, { shippingAddress });
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }

    getAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/admin`);
    }

    updateOrderStatus(id: number, status: string): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}/status`, JSON.stringify(status), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
