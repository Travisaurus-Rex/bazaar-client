import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';
import { User } from '@models/user';

interface AuthResponse {
  access_token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  constructor(private api: ApiService) {
    this.restoreSession();
  }

  private restoreSession(): void {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      this._user.set({
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      });
    } catch {
      localStorage.removeItem('access_token');
      this._user.set(null);
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/login', { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access_token);
        this._user.set(res.user);
      })
    );
  }

  register(email: string, password: string, role: string): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/register', { email, password, role }).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access_token);
        this._user.set(res.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this._user.set(null);
  }
}
