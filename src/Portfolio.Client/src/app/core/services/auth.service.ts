import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private apiBaseUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'portfolio_admin_token';
  
  readonly isLoggedIn = signal<boolean>(this.hasToken());

  private hasToken(): boolean {
    return !!(localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY));
  }

  login(email: string, password: string, rememberMe: boolean = false) {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response?.data?.accessToken) {
          if (rememberMe) {
            localStorage.setItem(this.TOKEN_KEY, response.data.accessToken);
          } else {
            sessionStorage.setItem(this.TOKEN_KEY, response.data.accessToken);
          }
          this.isLoggedIn.set(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }
}
