import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5065/api/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getUser(): any {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'Admin';
  }

  isSeller(): boolean {
    const user = this.getUser();
    return user && user.role === 'Seller';
  }

  isUser(): boolean {
    const user = this.getUser();
    return user && user.role === 'Customer';
  }
}
