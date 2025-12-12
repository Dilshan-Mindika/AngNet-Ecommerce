import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiUrl = `${environment.apiUrl}/dashboard`;

    constructor(private http: HttpClient) { }

    getDashboardStats(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/stats`);
    }

    getUserStats(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/user-stats`);
    }

    getChartData(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/charts`);
    }
}
